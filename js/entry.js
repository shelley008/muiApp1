var Entry = function(){
	//设置默认页
	var Index = 0;
	
	
	//定义子页面
	var subpages = ['confs.html','joinConf.html','settings.html'];
	var subpage_style = {
		top:'0px',
		bottom:'50px'
	};
	//初始化页面
	var handlerInitEntry = function(){
		mui.init();
		mui.plusReady(function(){
			handlerInitWebview();
			handlerBindChangeTabEvent();
		})
	}
	
	//初始化webview
	var handlerInitWebview = function(){
		//获取当前页面所属的webview窗口对象
		var self = plus.webview.currentWebview();
		for(var i = 0; i < subpages.length; i++ ){
			//创建webview子页
			var sub = plus.webview.create(subpages[i],subpages[i],subpage_style);
			//如果不是设置的主页，就hide
			if(i != Index){
				sub.hide();
			}
			//将webview添加到窗口
			self.append(sub);
		}
	}
	
	//切换子页面
	var handlerBindChangeTabEvent = function(){
		//当前显示的页面
		var activeTab = subpages[Index],
		title = document.querySelector(".mui-title");
		mui('.mui-bar-tab').on('tap','a',function(e){
			//获取子页面的id
			var targetTab = this.getAttribute('href');
			if(targetTab == activeTab){
				return;
			}
			this.setAttribute("style","top:0px")
			//显示目标选项卡
			plus.webview.show(targetTab)
			//隐藏当前
			plus.webview.hide(activeTab);
			//更改当前活跃的选项卡
			activeTab = targetTab
		})
	}
	
	return{
		initEntry:function(){
			handlerInitEntry()
		}
	}
}();

Entry.initEntry();