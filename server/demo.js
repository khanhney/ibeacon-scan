// var validator = require('validator');

// console.log(validator.isUUID('74278BDA-B644-4520-8F0C-720EAF059935'));
var product = [
    {
        uuid:'74278BDA-B644-4520-8F0C-720EAF059935', 
        minor: '64001',
        nameProduct: 'Galaxy Note 8',
        priceProduct: '15.000.000 VNĐ',
        madeIn: 'Hàn Quốc',
        info: 'Sản Phẩm Xuất xứ từ Hàn Quốc',
        img: 'http://iphonestore.com.vn/media/images/products/2017-10/04/dien-thoai-viet-note-8.png'
    },
    {
        uuid:'95F428B1-4A3A-4E39-B086-21BFF38DEB6D', 
        minor: '72',
        nameProduct: 'Iphone 5S Chính Hãng',
        priceProduct: '5.000.000 VNĐ',
        madeIn: 'USA',
        info: 'Sản Phẩm Bán Chạy Nhất Năm 2016',
        img: 'http://dlb99j1rm9bvr.cloudfront.net/iphone-8-plus-full-back-skin/parts/angle-1/other/base-model/size-1000/silver.png'
    }
];

// product.forEach(e => console.log(e));

var test = {};
var regions = [];
for(let i = 0 ; i < product.length ; i++){
    test.uuid = product[i].uuid;
    regions.push(test);
};
regions.forEach(e => console.log(e));