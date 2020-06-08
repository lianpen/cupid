# 需求背景
当第一次生成文件后，业务上对代码进行一些改动。再之后如果配置文件也发生了变化，第二次执行生成指令时，就遭遇了新老变化冲突的问题。

为了兼顾新老变化，Rocket引进diff来比对新老两个版本，使二次生成时可以兼顾新老版本。提高了Rocket健壮程度。

![图片](https://uploader.shimo.im/f/4reUYZIZXyUyQJ34.png!thumbnail)

# # 
# 获得新树
通过parser模块计算新树。

![图片](https://uploader.shimo.im/f/XPZSq4ITbTA7Uggb.png!thumbnail)

引进各种各样的parser 

递归抓手和组合。

```
  parseFuel(fuel: IFuel): void {
    if (fuel.fuelType == FUEL_TYPE.URANIUM) {
      new UraniumParser(fuel as IUranium);
    } else if (fuel.fuelType == FUEL_TYPE.REACTOR) {
      const reactor: IReactor = fuel as IReactor;
      reactor.fuelList.forEach((fuel: IFuel) => {
        this.parseFuel(fuel);
      });
      new ReactorParser(reactor);
    }
    if (fuel.dto0) {
      const sf: ts.SourceFile = getLaunchpad().program.getSourceFile(fuel.dto0.fileName);
      new DtoFileParser(sf, fuel.dto0);
      fuel.dto0.typeName = fuel.dto0.interfaceDeclaration.interfaceName;
    }
    if (fuel.vo) {
      const sf: ts.SourceFile = getLaunchpad().program.getSourceFile(fuel.vo.fileName);
      new DtoFileParser(sf, fuel.vo);
      fuel.vo.typeName = fuel.vo.interfaceDeclaration.interfaceName;
    }
  }
```
# 获得旧树
store中存储可能存放旧树的文件位置：

```
export function getLaunchFilePathMap(): Map<BUILD_FILE_TYPE, string> {
  if (launchFilePathMap) return launchFilePathMap;
  const launchpad = getLaunchpad();
  const { name, position, base } = launchpad;
  launchFilePathMap = new Map<BUILD_FILE_TYPE, string>();
  launchFilePathMap.set(
    BUILD_FILE_TYPE.CONTROLLER,
    path.resolve(base, 'controllers', position.join('-') + '-controller', name + '.ts')
  );
  launchFilePathMap.set(BUILD_FILE_TYPE.SERVICE, path.resolve(base, 'services', position.join('/'), name + '.ts'));
  launchFilePathMap.set(BUILD_FILE_TYPE.MOCK, path.resolve(base, 'mock', position.join('/'), name + '.ts'));
  return launchFilePathMap;
}
```
找到对应的文件后，进Differ函数解析。已controller为例。

```
/**
 * 根据已有文件获取旧燃料
 */
export default function getOldFuel(sourceFile: ts.SourceFile) {
  const handler = new Handler(sourceFile);
  const fuel = new Fuel();
  fuel.dto0 = handler.dto;
  fuel.vo = handler.vo;
  return fuel;
}
```
ts自带了program可以通过文件地址获得词法树，然后深度遍历词法树获得需要的旧树。

对于一个dto对象，需要关心遍历接口和属性两个维度，所以起两个loop分别去递归ts词法树。

```
/**
   * 递归接口
   * @param node
   */
  loopId(id: IInterfaceDeclaration, node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ObjectLiteralExpression:
        const ole: ts.ObjectLiteralExpression = node as ts.ObjectLiteralExpression;
        const properties = ole.properties;
        properties.slice().forEach((objectLiteralElementLike: ts.ObjectLiteralElementLike) => {
          const pa: ts.PropertyAssignment = objectLiteralElementLike as ts.PropertyAssignment;
          const name = (pa.name as ts.Identifier).text;
          const ps: IPropertySignature = new PropertySignature();
          ps.name = name;
          id.psList.push(ps);
          this.loopProperty(ps, pa.initializer);
        });
        return;
    }
    ts.forEachChild(node, this.loopId.bind(this, id));
  }


  /**
   * 递归属性
   * @param node
   */
  loopProperty(ps: IPropertySignature, node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.CallExpression:
        const ce: ts.CallExpression = node as ts.CallExpression;
        const expression = ce.expression;
        if (expression.kind != ts.SyntaxKind.PropertyAccessExpression) {
          break;
        }
        const propertyAccessExpression: ts.PropertyAccessExpression = expression as ts.PropertyAccessExpression;
        const key = propertyAccessExpression.name.text;
        let argText = '';
        if (ce.arguments.slice().length) {
          argText = ce.arguments[0]['text'];
        }
        switch (key) {
          case 'description':
            ps.comment = argText;
            break;
          case 'example':
            ps.example = argText;
            break;
          case 'number':
          case 'string':
          case 'boolean':
            ps.type = key;
            break;
          case 'object':
            const id = new InterfaceDeclaration();
            ps.interface = id;
            this.loopId(id, node);
            ps.type = 'object';
            return;
        }
        break;
    }
    ts.forEachChild(node, this.loopProperty.bind(this, ps));
  }
```
以上就是识别ts各种词法，转换成rocket可以识别的dto，获得了旧树。

# Diff比对
既然是比对，当比对冲突时就有谁覆盖谁的问题。

rocket引进参数"hard"，当执行命令时--hard，强制新树覆盖旧树。

反之，使用旧树。

从根节点开始，以新树为基准，比对所有属性，以及属性的自元素。

## 新增节点
树中插入 ..todo

## 删除节点
## 更新节点
一个属性定义的声明属性包括name(健名）,isArray(是否是数组），type(数据类型），example（举例），comment(描述）。当新旧属性不一致时：

如果都定义了该属性，根据--hard参数决定谁盖谁。

如果只有一个定义了该属性，使用那个有都。

如果都没有定义，属性为空。

## 递归子节点
如果一个属性的值是另一个接口，且新老属性都有这个接口定义，则递归这个子节点。开始一轮新的比对。

## 节点移动
属性是无序的

