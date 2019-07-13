(function  judgeobj(item,maxnum) {
    //第一个参数是判断那个对象 ， 第二个对象的属性值个数最多是多少
    let getString =  Object.prototype.toString.call(item).slice(8,-1);
    console.dir(item);
    console.log(getString);
    let Arr = [];
    if (getString === 'Object'){
        //进来一定是对象
        let flag = 0;
        //标记对象的属性 个数
        let obj = {}
        //创建一个对象
        for (let key in item){
            flag++
            obj[key] = item[key];
            console.log(key);
            if (flag === maxnum){
                //如果满足最大属性量 将 对象 加入数组里 ;
                Arr.push(obj);
                obj={}
                flag = 0;
                // let rubbish = rubbish+Arr.length
            }
        };
        //防止数据遗漏
        Arr.push(obj)
        return Arr
    }
    return
})()