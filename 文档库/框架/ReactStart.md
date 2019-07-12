<h1>框架学习</h1>

React 工作原理 自身有一个镜像DOM 将代码先放置到 镜像DOM 上 然后一次渲染到 DOM上
渲染到DOM上 API ReactDOM.render(组件/或者变量，DOM节点)；
JSX 可以直接用标签书写原生：document.creatElement（x）==》》  <x><x/>
<h2>创建组件的方式</h2> （React 用JSX 遇到<会将他解析成html标签 如果想要用变量 或者 js语法 Api等  要加{}）；
第一种 工厂函数 function Mycomponent（）{ return ''<h1'>构造函数</'h1'>'
class Mycomponent extents React.Component{
render(){
		return(<div>
		<h4>类创建组件</h4>
		</div>)
}
}
render是React 内置的 重写父类方法 
渲染 /使用
ReactDOM.render(<Mycomponent/>,节点)注：如果标签小写 回当标签解析 
所以我们用大写来书写标签 上面构造时也是同理如果 用小写 就会出现冲突
在class React默认开启了严格模式  所有标签都要闭合 
<h2>组件属性<h2/>
<h3>state</h3>

1)state是组件对象最重要的属性, 值是对象(可以包含多个数据)
2)组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)状态，在React 中每一个组件都有内置的state状态属性 在类中 能获取
this.state 状态如果修改 会造成 重新渲染 render 但是要注意 状态不可以直接更新 如：this.state.var = 1//这样修改不会被React监听到 
要用setState修改  如： this.setState（{var：1}）
当状态里的某个属性值时对象类型时 该属性不能直接修改 即不能解构赋值的方式直接获取到 如 let {var} = this.state
正确做法 let var = [...var ]||{...var } 重新定义一个 将源代码的地址循环枚举或者便利出来重新赋值给 变量防止自身更改 原状态也更改 React 对象可以用...枚举  React 认为 没有被更改过 不渲染render；
<h3>props</h3>
props获取传参的数据用对象储存
我们可以通过自己 的props拿到穿的参数 解构赋值获取  如： let {name，age，genner}=this.props ；props只能读不能修改
如 this.props.name = 'dd；
###请区别一下组件的props和state属性
1)state: 组件自身内部可变化的数据
2)props: 从组件外部向组件内部传递数据, 组件内部只读不修改
<h2>理解组件化拆分</h2>
<h3>refs与事件处理</h3>
语法 直接 ref=''; 创建一个 容器  在class中 表达式可以书写 而且是在实例身上 container = React.creatRef  
获取  this.refs   
	  this.container.current
组件内的标签可以用ref 标识自己
2.4.3. 事件处理
1)通过onXxx属性指定组件的事件处理函数(注意大小写)
a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件
b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素)
2)通过event.target得到发生事件的DOM元素对象
<h2>生命周期</h2>
什么是生命周期？ ：
人或事物 出生，制造出来 直道销毁死亡的过程 叫做生命周期；
React 组件的生命周期
<hr/>
start ReactDOM.render()//只有一次
	componentWillMount（）将要挂上
	render（）渲染
	componentDidMount（）挂载完毕
<hr/>
move this.setState（）true？//一旦发生改变 即为true 就会触发可以n次
	componentWillUpdate（）将要更新数据
	render（）渲染
	componentDidUpdate （）更新完毕
<hr/>
end ReactDOM.unmountComponentAtNode
	componentWillUnmount（）将要死亡   =》已经挂了不需要死亡完毕了···