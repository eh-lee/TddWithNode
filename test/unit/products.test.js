const productController = require("../../controller/products");
const productModel = require('../../models/Product');

productModel.create = jest.fn();

describe("Product Controller Create", () => {
    it("should have a createProduct func", () => {
        expect(typeof productController.createProduct).toBe("function");
    });
    it("should call ProductModel.create", () => {
        productController.createProduct();
        expect(productModel.create).toBeCalled();
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