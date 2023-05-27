const productController = require("../../controller/products")
const Product = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const productData = require("../data/new-product.json");

Product.create = jest.fn();

let req, res, next;
beforeEach(() => {
    // node-mocks-http library에 있는 createRequest라는 메서드
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})

describe("Product Controller Create", () => {
    beforeEach(() => {
        req.body = productData;
    })

    it("Should have a createProduct function", () => {
        expect(typeof productController.createProduct).toBe("function");
    })

    it("Should call Product.create", () => {
        productController.createProduct(req, res, next);
        expect(Product.create).toBeCalledWith(productData);
    })

    it("Should return 201 status code", () => {
        productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("Should return json body in res", () => {
        Product.create.mockReturnValue(productData);
        productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(productData);
    })
})


// Calculation
// // 그룹화("설명", ()=>{그룹에 포함되는 객체들})
// describe("calculation", () => {
//     test("two plus two is four", () => {
//         // expect.matcher;
//         expect(2 + 2).toBe(4);
//     })

//     test("two plus two is not five", () => {
//         expect(2 + 2).not.toBe(5);
//     })
// });
