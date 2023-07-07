const productController = require("../../controller/products");
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const Product = require("../../models/Product");
const allProducts = require("../data/all-products.json");

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();

const productId = "5sdfdsfdsfsdfwe"
const updatedProduct = { name: "updated name", description: "update description" };

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


describe("Product Controller Get", () => {
    it("should have a getProducts function", () => {
        expect(typeof productController.getProducts).toBe("function");
    })

    it("should call ProductModel.find({})", async () => {
        // Product 안의 모든 값을 조건 없이 가져온다
        await productController.getProducts(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({});
    })

    it("should return 200 res", async () => {
        await productController.getProducts(res, req, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })

    it("should return json body in res", async () => {
        productModel.find.mockReturnValue(allProducts);
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts);
    })

    it("should handle errors", async () => {
        const errorMessage = { messgae: "Error finding product data" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
})

describe("Product Controller GetById", () => {
    it("should have a getProductById", () => {
        expect(typeof productController.getProductById).toBe("function")
    })

    it("should call productMode.findById", async () => {
        req.params.productId = productId
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId);
    })

    it("should return json body and res code 200", async () => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should return 404 when item doesnt exist", async () => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should handle errors", async () => {
        const errorMessage = { message: "error" };
        const rejectedPromise = Promise.reject(errorMessage);
        // promise를 통해 controller의 catch block으로 보냄
        Product.findById.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})


// =============================================================
// ========================== GET ==============================
// =============================================================

it("GET /api/products", async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0];
})

it("GET /api/product/:productId", async () => {
    const response = await request(app).get('/api/products/' + firstProduct._id)
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
})

it("GET id doesnt exist /api/product/:productId", async () => {
    const response = await request(app).get('/api/products/64a141d3821cd55198345157');
    expect(response.statusCode).toBe(404);
})


// =============================================================
// ======================== UPDATE =============================
// =============================================================

describe("Product Controller Upadate", () => {
    it("should have an upadateProduct func", () => {
        expect(typeof productController.updateProduct).toBe("function");
    })

    it("should call productModel.findByIdAndUpdate", async () => {
        req.params.productId = productId;
        req.body = updatedProduct;
        await productController.updateProduct(req, res, next);
        expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
            productId, { name: "updated name", description: "update description" },
            { new: true }
        )
    })

    it("should return json body and res code 200", async () => {
        req.params.productId = productId;
        req.body = updatedProduct;
        productModel.findByIdAndUpdate.mockReturnValue(updatedProduct)
        await productController.updateProduct(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updatedProduct);
    })
})