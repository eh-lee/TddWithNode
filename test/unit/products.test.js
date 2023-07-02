const productController = require("../../controller/products");
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const Product = require("../../models/Product");
productModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe("Product Controller Create", () => {
    beforeEach(() => {
        req.body = newProduct;
    })

    it("should have a createProduct func", () => {
        expect(typeof productController.createProduct).toBe("function");
    });

    it("should call ProductModel.create", () => {
        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })

    it("should return 201 res code", () => {
        productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        // send가 있다면, send(결과값)가 잘 전달되었는지 확인
    })

    it("should return json body in res", () => {
        productModel.create.mockReturnValue(newProduct);
        // mockFunc가 어떤 결과값을 반활할지 알려줄 때
        productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })
});

//====================================================
//============== Ex 1) "Calculation" =================
//====================================================

// describe("Calculation", () => {
//     test('two plus two is four', () => {
//         expect(2 + 2).toBe(4);
//     })

//     test('two plus two is not five', () => {
//         expect(2 + 2).not.toBe(5);
//     })
// })