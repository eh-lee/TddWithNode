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
    next = jest.fn();
})

describe("Product Controller Create", () => {
    beforeEach(() => {
        req.body = newProduct;
    })

    it("should have a createProduct func", () => {
        expect(typeof productController.createProduct).toBe("function");
    });

    it("should call ProductModel.create", async () => {
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })

    it("should return 201 res code", async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
        // send가 있다면, send(결과값)가 잘 전달되었는지 확인
    })

    it("should return json body in res", async () => {
        productModel.create.mockReturnValue(newProduct);
        // mockFunc가 어떤 결과값을 반활할지 알려줄 때
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })

    it("should handle errors", async () => {
        const errorMessage = { messgae: "property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
        // next : middleware 인자. 비동기 요청에 대한 error handling.
    })
});