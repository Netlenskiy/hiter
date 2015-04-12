$( function () {
	function scrollWindow (into) {
		var doc = document.documentElement.scrollTop ? document.documentElement : document.body;
		$(doc).animate({
			scrollTop: into
		}, {
			duration: 1000
		});
	}
	var buttons = $("input[type=image]").on('mousedown click', function(event) {
		event.preventDefault();
	});
	var navLinks = $("#menu a").on('click', function(event) {
		event.preventDefault();
		scrollWindow( $(event.target).attr("into") );
	});
	var slider1 = new Slider1();
	var slider2 = new Slider2();
	var gallery = new Gallery( $("#c_slider_container") );
});
function Slider1 () {
	var self = this;
	var tumbler1 = $("#slider_switch>img:first-child");
	var tumbler2 = $("#slider_switch>img:last-child");
	tumbler1.active = true;
	tumbler2.active = false;
	var img1 = $("#img1");
	var img2 = $("#img2");
	var imgs = [img1, img2];

	self.slideImg = function (into) {
		var pos = into == "right" ? 0 : -1260;
		var src1 = tumbler1.attr("src");
		var src2 = tumbler2.attr("src");
		if (into == "right" && !tumbler2.active) return;
		if (into == "left" && !tumbler1.active) return;
		tumbler1.attr("src", src2);
		tumbler2.attr("src", src1);
		tumbler1.active = !tumbler1.active;
		tumbler2.active = !tumbler2.active;
		imgs[0].animate({
			left: pos
		}, {
			duration: "slow"
		});
		imgs[1].animate({
			left: pos + 1260
		}, {
			duration: "slow"
		});
	}
	tumbler1.on('click', function (event) {
		event.preventDefault();
		self.slideImg("right");
	});
	tumbler2.on('click', function (event) {
		event.preventDefault();
		self.slideImg("left");
	});
}
function Slider2 () {
	var self = this;
	var tumbler1 = $("#r_slider_toggle>img:first-child");
	var tumbler2 = $("#r_slider_toggle>img:nth-child(2)");
	var tumbler3 = $("#r_slider_toggle>img:last-child");
	var activeTumbler = tumbler1;
	var activeTumblerSrc = tumbler1.attr('src');
	tumbler1.num = 1;
	tumbler2.num = 2;
	tumbler3.num = 3;
	var block1 = $("#r_slider_1");
	var block2 = $("#r_slider_2");
	var block3 = $("#r_slider_3");
	var blocks = [block1, block2, block3];
	var blockWidth = parseInt( block1.css('width'), 10 );
	var durtn = blockWidth / 60 << 0;
	console.log("blockWidth", blockWidth);
	console.log("durtn", durtn);
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].pos = parseInt( blocks[i].css('left'), 10 );
	};
	function slideImg (curTumbler) {
		var into = activeTumbler.num - curTumbler.num;
		activeTumbler.attr('src', curTumbler.attr('src'));
		curTumbler.attr('src', activeTumblerSrc);
		activeTumbler = curTumbler;
		for (var i = 0; i < blocks.length; i++) {
			blocks[i].pos += blockWidth * into;
			blocks[i].animate({
				"left": blocks[i].pos
			}, {
				duration: 400
			});
		};
	}
	tumbler1.on('click', function (event) {
		event.preventDefault();
		slideImg(tumbler1);
	});
	tumbler2.on('click', function (event) {
		event.preventDefault();
		slideImg(tumbler2);
	});
	tumbler3.on('click', function (event) {
		event.preventDefault();
		slideImg(tumbler3);
	});
}
///////////////////////////////////////////////////////////////////////////

function Gallery (container) {
	var blocks = $("ul", container).children();
	var pre = $("#comments_pre");
	var next = $("#comments_next");
	var blockMarginL = parseInt( blocks.first().css('margin-left'), 10 );
	var blockMarginR = parseInt( blocks.first().css('margin-right'), 10 );
	var blockWidth = parseInt( blocks.first().css('width'), 10 ) + blockMarginR + blockMarginL;
	var hiddenBlocksQuantity = blocks.length - parseInt( container.width(), 10 ) / blockWidth << 0;
	blocks.each(function (index, el) {
		el.setAttribute("pos", 0);
	});
	function slideGallery(into) {
		var step = into === "left" ? -blockWidth : blockWidth;
		blocks.each(function (index, el) {
			var newPos = parseInt( el.getAttribute("pos"), 10 ) + step;
			$(el).animate({
				"left": newPos
			}, {
				duration: "default",
				complete: function () {
					$(el).attr('pos', newPos);
				}
			});
		});
	}
	pre.on('click', function (event) {
		event.preventDefault();
		if ( blocks[0].getAttribute('pos')!=-hiddenBlocksQuantity*blockWidth )
			slideGallery("left");
	});
	next.on('click', function (event) {
		event.preventDefault();
		if ( blocks[0].getAttribute('pos') != 0 )
			slideGallery("right");
	});
}
