$(function(){  //jquery的入口函数
    //使用id选择器，选中table控件
    $('#stu').bootstrapTable({
         url:'http://localhost:8857/all', //请求地址
         method:'get',//请求方式
         dataType:'json',//服务器端响应的数据格式为json 
         striped: true, //隔行变色
         pagination: true, // 显示分页工具栏
         clickToSelect:true, //表示点击选中
         singleSelect:true,//每次只选中一行
         uniqueId:'sno',//指定行的唯一标识，一般为主键
         //分页
         pageSize:5,
         pageList:[5,10,15,20,25,30],
         paginationPreText: '&lt;',
         paginationNextText: "&gt;",
         responseHandler:function(res){
            return res.data;
         },
         columns:[  //数据表格中的列
            {
                checkbox:true,
                align:'center',
                valign:'middle'
            }, 
            {
                 field:'sno',  
                 title:'编号',
                 align:'center',
                 valign:'middle'

             },
             {
                 field:'sname',
                 title:'姓名',
                 align:'center',
                 valign:'middle'
             },
             {
                 field:'sage',
                 title:'性别',
                 align:'center',
                 valign:'middle'
             },
             {
                 field:'saddress',
                 title:'地址',
                 align:'center',
                 valign:'middle'
             },
             {
                 field:'brithday',
                 title:'生日',
                 align:'center',
                 valign:'middle',
                 formatter:function (value) {
                     let now = new Date(value);
                     let y = now.getFullYear();
                     let m = now.getMonth()+1;
                     let d = now.getDate();
                     m = m < 10 ? '0'+ m : m 
                     d = d < 10 ? '0'+ d : d
                     return y + '-' + m + '-' + d
                 }
             },
             {
                 field:'sno',
                 title:'操作',
                 button:'删除',
                 align:'center',
                 valign:'middle',
                 formatter: function (value,row,index) {
                     let result =''
                     result += "<a href='javascript:;' class='btn btn-success btn-sm' onclick=\"EditById('"+value+"')\"><span class='glyphicon glyphicon-pencil'></span></a> &nbsp;&nbsp;&nbsp;";
                     result += "<a href='javascript:;' class='btn btn-danger btn-sm' onclick=\"DeleteById('"+value+"')\"><span class='glyphicon glyphicon-trash'></span></a>";
                     return result
                 }
             }
         ]
    })

})
//入口函数结束


//编辑
function EditById(value) {
    var con = '<center>'
        +'<form id="updet">'
            +'编号：<input type="text" name="sno" readyOnly><br><br>'
            +'姓名：<input type="text" name="sname"><br><br>'
            +'性别：<input type="text" name="sage"><br><br>'
            +'生日：<input type="date" name="sbirthday" style="width:160px"><br><br>'
            +'地址：<input type="text" name="saddress"><br><br>'
        +'</form>'
    +'</center>';
    BootstrapDialog.show({
        title:'修改',
        message: con,
        size: BootstrapDialog.SIZE_SMALL, //对话框大小
        draggable : true,//对话框可拖拽
        buttons:[
            {
            label:'修改', //按钮上文本
            cssClass:'btn-success btn-sm',  //样式
            icon:'glyphicon glyphicon-ok-sircle',    //按钮图标
            action:function(){
            }
        },
        {
            label:'取消', 
            cssClass:'btn-warning btn-sm', 
            icon:'glyphicon glyphicon-warning-sign',   
            action:function(dialog){
                dialog.close()
            }
        }], //数组，每个{}代表一个数组
        onshown:function(dialogRef) {    //当对话框打开时，进行的操作
            var arr = $('#stu').
            $.ajax({
                url:'http://localhost:8857/update',
                type:'post',
                data:{

                }
            })
        }
    })
   
}

//删除
function DeleteById(value) {
    BootstrapDialog.confirm({
    title:'删除',
    message:'确定删除这条记录吗？',
    type : BootstrapDialog.TYPE_WARNING,//对话框类型
    draggable : true,//对话框可拖拽
    btnCancelLabel : '取消', //  默认为 'Cancel', 
    btnOKLabel : '删除', // 默认为 'OK', 
    btnOKClass : 'btn-warning', // 若没有指定则按钮的类型和对话框的类型一致,
    size : BootstrapDialog.SIZE_SMALL,//对话框的大小
    callback: function(result){
        if(result){
            $.ajax({
                url:'http://localhost:8857/del',
                type:'post',
                data: {
                    sno: value
                },
                success:function(res){
                    $('#stu').bootstrapTable('refresh')
                    toastr.options = {  
                        positionClass: "toast-top-center",  
                        timeOut: "2000",  
                    };  
                    toastr.success(res.msg);
                }
            })
        }
    }
   })
}

//添加按钮
$('#btn_add').click(function(){
    $.ajax({
        url:'http://localhost:8857/insert',
        type: 'post',
        dataType:'json',
        data:{
            sno:$('#sno').val(),
            sname:$('#sname').val(),
            sage:$('input[type="radio"]:checked').val(),
            sbirthday:$('#sbirthday').val(),
            saddress:$('#saddress').val(),
        },
        //添加成功后刷新表格
        success:function(res){
            $('#stu').bootstrapTable('refresh')
            toastr.options = {  
                positionClass: "toast-top-center",  
                timeOut: "2000",  
            };  
            toastr.success(res.msg);
            //清楚表单信息
            $('#sno').val('');
            $('#sname').val('');
            $('input[type="radio"]:checked').val('');
            $('#sbirthday').val('');
            $('#saddress').val('');
        }
    })
})
