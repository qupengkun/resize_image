; // 确保在最小化和合并脚本的情况下，插件的代码可以正常的运行。
(function($) {
	// "use strict";
	// 插件命名
	var pluginName = "uploadImg";
	var pluginTemplates = {
		myUploadModal: '<div class="modal fade" id="myUploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><ul class="f-line-height-3"><li class="m-modal-funcList_item f-bb1" id="chooseByCamera"><a><div class="u-h3 text-center">拍照</div></a></li><li class="m-modal-funcList_item" id="chooseByGallery"><a><div class="u-h3 text-center">从手机相册选择</div></a></li></ul></div><div class="modal-footer"><button type="button" class="btn btn-white col-xs-6 col-xs-offset-3 u-h4" data-dismiss="modal">取消</button></div></div></div></div>'
	};
	// 默认参数
	var defaults = {
		propertyName: 'value',
		errMsg: "上传失败",
		fileType: "defaultType", // 文件类型
		fileCatagory: "", // 文件分类
		contentType: '',
		img_show: "defaultShow", // 展示图片的dom
		img: "defaultImg",
		uploadTitle: "上传图片",
		uploadUrl: null, // 上传url
		localIds: null,
		sw: 0,
		sh: 0,
		tw: 0,
		th: 0,
		scale: 0,
		//maxWidth: 1280,
		//maxHeight: 720,
		maxSize: 2 * 1024 * 1024,
		fileSize: 0, //文件大小
		fileDate: null, //文件日期
		fileName: '', //文件名称
		filePath: null, //文件路径
		input: null,
		canvas: null,
		loading: function() {},
		mime: {
			'png': 'image/png',
			'jpg': 'image/jpeg',
			'jpeg': 'image/jpeg',
			'bmp': 'image/bmp'
		},
		css: {
			width: '100px',
			height: '100px',
			float: 'left'
		},
		func: null,
		uploadFunc: null, //上传至服务器方法
		templates: {
			myUploadModal: pluginTemplates.myUploadModal,
			testDom: '<h1 id="h1test" style="display:none;" onclick="alert(1)">test</h1>'
		},
		domIds: {
			myUploadModal: "myUploadModal", // 模态框
			chooseByCamera: "chooseByCamera", // 拍照
			chooseByGallery: "chooseByGallery" // 从手机相册选择
		},
		previewFunc: function(filePath) {
			//console.log("filePath:" + filePath);
		}, //预览方法
		beforeUpload: function() {
			return true;
		}, //上传前处理方法
		afterUpload: null //上传后处理方法
	};
	// 插件初始化方法
	var Plugin = function Plugin(element, options) {
		// 参数合并
		this._defaults = options;
		this._name = pluginName;
		this._element = $(element);
		this.initPlugin();
	}

	// 插件方法声明
	Plugin.prototype = {
		initPlugin: function() {
			var that = this;
			var thatOptions = this._defaults;
			var thatElement = this._element;
			// 其他浏览器（除微信公众号和app外）
			var imgInput = jQuery('<input type="file" accept="image/*;capture=camera" />');
			thatElement.click(function() {
				imgInput.click();
			});
			thatOptions.input = imgInput[0];
			thatOptions.uploadFunc = function(base64) {
				
//				jQuery.ajax({
//					url: thatOptions.uploadUrl || 'C:/Users/qupengkun/Desktop/test2',//that.getReqUrl("qiniu/upload.jsonp"),
//					data: {
//						imgStr: base64,
//						fileType: thatOptions.fileType,
//						contentType: thatOptions.contentType,
//						fileCatagory: thatOptions.fileCatagory
//					},
//					//type: 'post',
//					//dataType: 'json',
//					success: function(data) {
//						if(data.resultStatus !== 'SUCCESS') {
//							alert(data.resultMessage);
//						} else {
//							if(thatOptions.img_show) { //如果有图片显示dom
//								jQuery('#' + thatOptions.img_show).prop('src', data.path);
//								for(var key in thatOptions.css) {
//									jQuery('#' + thatOptions.img_show).css(key, thatOptions.css[key]);
//								}
//								jQuery('#' + thatOptions.img).val(data.model);
//								jQuery('#' + thatOptions.img).trigger('input').trigger("blur");
//								if(jQuery.isFunction(thatOptions.func)) {
//									thatOptions.func(data);
//								}
//							}
//							if(jQuery.isFunction(thatOptions.afterUpload)) {
//								thatOptions.afterUpload({
//									imgId: data.model
//								});
//							}
//						}
//					},
//					error: function(XMLHttpRequest, textStatus, errorThrown) {
//						console.log(XMLHttpRequest.status);
//						console.log(XMLHttpRequest.readyState);
//						console.log(textStatus);
//						alert(thatOptions.errMsg);
//					}
//				});
			};
			that.addEvent();
		},
		showPlugin: function() {
			var that = this;
			var thatOptions = this._defaults;
			var thatElement = this._element;
		},
		hidePlugin: function() {
			var that = this;
			var thatOptions = this._defaults;
			var thatElement = this._element;
		},
		getReqUrl: function(urlTemp) {
			urlTemp = 'https://www.meilinbang.cn:8444/' + urlTemp + '?random=' + Math.random();
			//urlTemp = 'https://admin.meilinbang.cn/' + urlTemp + '?random=' + Math.random();
			return urlTemp;
		},
		/**
		 * @description 绑定事件
		 * @param {Object}
		 *            elm 元素
		 * @param {Function}
		 *            fn 绑定函数
		 */
		addEvent: function() {
			var that = this;
			var thatOptions = this._defaults;
			var thatElement = this._element;

			function tmpSelectFile(ev) {
				that.handelSelectFile(ev);
			}
			thatOptions.input.addEventListener('change', tmpSelectFile, false);
		},
		/**
		 * @description 绑定事件
		 * @param {Object}
		 *            elm 元素
		 * @param {Function}
		 *            fn 绑定函数
		 */
		handelSelectFile: function(ev) {
			var that = this;
			var thatOptions = this._defaults;
			var thatElement = this._element;
			var file = ev.target.files[0];
			thatOptions.contentType = file.type;
			// 如果没有文件类型，则通过后缀名判断（解决微信及360浏览器无法获取图片类型问题）
			if(!thatOptions.contentType) {
				thatOptions.contentType = thatOptions.mime[file.name.match(/\.([^\.]+)$/i)[1]];
			}
			if(!/image.(png|jpg|jpeg|bmp)/.test(thatOptions.contentType)) {
				alert('选择的文件类型不是图片');
				return;
			}
			/*if(file.size > thatOptions.maxSize) {
				alert('选择文件大于' + thatOptions.maxSize + 'M，请重新选择');
				return;
			}*/
			var fileAry = file.name.split('.');

			thatOptions.fileName = file.name;
			thatOptions.fileSize = file.size;
			thatOptions.fileType = fileAry[fileAry.length - 1];
			thatOptions.fileDate = file.lastModifiedDate;
			//that.readImage(file);
			//图片压缩上传
			lrz(file, {
				width: 800
			}).then(function(rst) {
				alert(JSON.stringify(rst));
				
				var base64Temp = rst.base64;
				var base64TempArr = base64Temp.split(';base64,');
				if(thatOptions.beforeUpload()) { //如果满足上传条件
					thatOptions.uploadFunc(base64TempArr[1]);
				}
				return rst;
			}).catch(function(err) {
				console.log('图片压缩错误：' + err);
				alert('图片上传失败！');
			});
		},
		/**
		 * @description 读取图片文件
		 * @param {Object}
		 *            image 图片文件
		 */
		readImage: function(file) {
			var that = this;
			var thatOptions = this._defaults;
			var thatElement = this._element;

			function tmpCreateImage(uri) {
				that.createImage(uri);
			}
			thatOptions.loading();
			that.getURI(file, tmpCreateImage);
		},
		/**
		 * @description 通过文件获得URI
		 * @param {Object}
		 *            file 文件
		 * @param {Function}
		 *            callback 回调函数，返回文件对应URI return {Bool} 返回false
		 */
		getURI: function(file, callback) {
			var that = this;
			var thatOptions = this._defaults;
			var thatElement = this._element;
			var reader = new FileReader();

			function tmpLoad() {
				// 头不带图片格式，需填写格式
				var re = /^data:base64,/;
				var ret = this.result + '';
				thatOptions.filePath = ret;
				thatOptions.previewFunc(ret);
				if(re.test(ret)) ret = ret.replace(re, 'data:' + thatOptions.mime[thatOptions.fileType] + ';base64,');
				callback && callback(ret);
			}
			reader.onload = tmpLoad;
			reader.readAsDataURL(file);
			return false;
		},
		/**
		 * @description 创建图片
		 * @param {Object}
		 *            image 图片文件
		 */
		createImage: function(uri) {
			var that = this;
			var thatOptions = this._defaults;
			var thatElement = this._element;
			var canvas = document.createElement('CANVAS'),
				ctx = canvas.getContext('2d'),
				img = new Image;
			img.onload = function() {
				//				canvas.height = img.height>thatOptions.maxHeight?thatOptions.maxHeight:img.height;
				//				canvas.width = img.width>thatOptions.maxWidth?thatOptions.maxWidth:img.width;
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img, 0, 0);
				if(thatOptions.beforeUpload()) { //如果满足上传条件
					thatOptions.uploadFunc((canvas.toDataURL(thatOptions.contentType) + "").replace('data:' + thatOptions.contentType + ';base64,', ''));
				}
				canvas = null;
			};
			img.src = uri;
		},
		/**
		 * @description 创建Canvas将图片画至其中，并获得压缩后的文件
		 * @param {Object}
		 *            img 图片文件
		 * @param {Number}
		 *            width 图片最大宽度
		 * @param {Number}
		 *            height 图片最大高度
		 * @param {Function}
		 *            callback 回调函数，参数为图片base64编码 return {Object} 返回压缩后的图片
		 */
		drawImage: function(img, callback) {
			var that = this;
			var thatOptions = this._defaults;
			var thatElement = this._element;
			thatOptions.sw = img.width;
			thatOptions.sh = img.height;
			thatOptions.tw = img.width;
			thatOptions.th = img.height;
			thatOptions.scale = 0;
			//			if(thatOptions.sw > thatOptions.maxWidth) {
			//				thatOptions.sw = thatOptions.maxWidth;
			//				thatOptions.sh = Math.round(thatOptions.sw / thatOptions.scale);
			//			}
			//			if(thatOptions.sh > thatOptions.maxHeight) {
			//				thatOptions.sh = thatOptions.maxHeight;
			//				thatOptions.sw = Math.round(thatOptions.sh * thatOptions.scale);
			//			}
			//			
			thatOptions.canvas = document.createElement('canvas');
			var ctx = thatOptions.canvas.getContext('2d');

			thatOptions.canvas.width = thatOptions.sw;
			thatOptions.canvas.height = thatOptions.sh;
			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, thatOptions.sw, thatOptions.sh);
			if(thatOptions.beforeUpload()) { //如果满足上传条件
				thatOptions.uploadFunc((thatOptions.canvas.toDataURL(thatOptions.contentType) + "").replace('data:' + thatOptions.contentType + ';base64,', ''));
			}
			ctx.clearRect(0, 0, thatOptions.tw, thatOptions.th);
			thatOptions.canvas.width = 0;
			thatOptions.canvas.height = 0;
			thatOptions.canvas = null;
		}
	};
	// 插件声明
	jQuery.fn.uploadImg = function(options, postData) {
		return this.each(function() {
			var ui = jQuery.data(this, 'plugin_' + pluginName);
			// if (!ui) {
			var opts = jQuery.extend(true, {}, defaults, typeof options === "object" ? options : {});
			ui = new Plugin(this, opts);
			// 缓存插件
			jQuery.data(this, 'plugin_' + pluginName, ui);
			// }
			// 调用方法
			if(typeof options === "string" && typeof ui[options] == "function") {
				// 执行插件的方法
				if(postData) {
					ui[options].apply(ui, [postData]);
				} else {
					ui[options].apply(ui);
				}
			}
		});
	};
})(jQuery);