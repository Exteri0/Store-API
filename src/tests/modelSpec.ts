import { ProductStore, Product } from "../models/products";
import { OrderStore, Order } from "../models/orders";
import { UserStore, User } from "../models/users";
import bcrypt, { compareSync } from "bcrypt";

const UStore = new UserStore();
const PStore = new ProductStore();
const OStore = new OrderStore();

describe("Product Model Tests", async () => {
  const goodProduct: Product = {
    name: "ball",
    price: 100,
  };

  const createdGoodProduct = { ...goodProduct, id: 1 };

  const createdGoodProducts = [
    {
      ...goodProduct,
      id: 1,
    },
    {
      ...goodProduct,
      id: 2,
    },
  ];

  describe("isDefined tests", async () => {
    it("expects that there is an index function defined", async () => {
      expect(PStore.index).toBeDefined();
    });
    it("expects that there is a show function defined", async () => {
      expect(PStore.index).toBeDefined();
    });
    it("expects that there is a create function defined", async () => {
      expect(PStore.index).toBeDefined();
    });
  });

  describe("Product Model functionality tests", async () => {
    it("tests the functionality of the create method", async () => {
      const result = await PStore.create(goodProduct);
      expect(result).toEqual(createdGoodProduct);
    });
    it("tests the functionality of the index method", async () => {
      await PStore.create(goodProduct);
      const result = await PStore.index();
      expect(result).toHaveSize(2);
      expect(result).toEqual(createdGoodProducts);
    });
    it("tests the functionality of the show method", async () => {
      const result = await PStore.show(createdGoodProduct.id);
      expect(result).toEqual(createdGoodProduct);
    });
  });
});

describe("User Model tests", async () => {
  const goodUser: User = {
    firstname: "omar",
    lastname: "faramawy",
    password: "secret",
  };

  const badUser1: User = {
    firstname: "omar",
    lastname: "faramawy",
    password: "notcorrectpassword",
  };

  const badUser2: User = {
    firstname: "faramawy",
    lastname: "omar",
    password: "secret",
  };

  const createdGoodUser = {
    id: 1,
    firstname: "omar",
    lastname: "faramawy",
    password: bcrypt.hashSync(
      goodUser.password + process.env.pepper,
      parseInt(process.env.saltRounds as string)
    ),
  };

  describe("isDefined tests", async () => {
    it("expectst that there is an index method defined", async () => {
      expect(UStore.index).toBeDefined();
    });
    it("expectst that there is a create method defined", async () => {
      expect(UStore.create).toBeDefined();
    });
    it("expectst that there is a show method defined", async () => {
      expect(UStore.show).toBeDefined();
    });
    it("expectst that there is a sign in method defined", async () => {
      expect(UStore.signIn).toBeDefined();
    });
  });

  describe("User Model functionality tests", async () => {
    it("tests the functionality of the create method", async () => {
      const result = await UStore.create(goodUser);
      expect(result.firstname).toEqual(createdGoodUser.firstname);
      expect(result.lastname).toEqual(createdGoodUser.lastname);
      expect(result.id).toEqual(1);
    });
    it("tests functionality of index method", async () => {
      const result = await UStore.index();
      expect(result).toHaveSize(1);
    });
    it("tests the functionality of show method", async () => {
      const result = await UStore.show(createdGoodUser.id);
      expect(result.firstname).toEqual(createdGoodUser.firstname);
      expect(result.lastname).toEqual(createdGoodUser.lastname);
    });
    it("tests the functionality of sign in method", async () => {
      const result1 = await UStore.signIn(goodUser);
      const result2 = await UStore.signIn(badUser1);
      const result3 = await UStore.signIn(badUser2);
      expect(result1).toBeDefined();
      expect(result2).toBeNull();
      expect(result3).toBeNull();
    });
  });
});

describe("Order Model tests", async () => {
  describe("isDefined tests", async () => {
    it("expects that there is an add product function defined", async () => {
      expect(OStore.addProduct).toBeDefined();
    });
    it("expects that there is an index function defined", async () => {
      expect(OStore.index).toBeDefined();
    });
    it("expects that there is a currentOrder function defined", async () => {
      expect(OStore.currentOrder).toBeDefined();
    });
    it("expects that there is a create function defined", async () => {
      expect(OStore.create).toBeDefined();
    });
    it("expects that there is a set status function defined", async () => {
      expect(OStore.setStatus).toBeDefined();
    });
  });

  describe("Order Model functionality tests", async () => {
    const goodOrder: Order = {
      user_id: 1,
      status: "active",
      product_id: 1,
      quantity: 12,
    };

    const createdGoodOrder: Order = {
      user_id: 1,
      id: 1,
      status: "active",
    };

    const addedProduct = {
      product_id: 1,
      quantity: 12,
      order_id: 1,
    };

    it("tests the functionality of the create function", async () => {
      const result = await OStore.create(goodOrder);
      expect(result).toEqual({
        order: createdGoodOrder,
      });
    });

    it("tests the functionality of the index function", async () => {
      const result = await OStore.index();
      expect(result).toEqual([
        {
          ...createdGoodOrder,
        },
      ]);
    });

    it("tests the functionality of adding a product on an order", async () => {
      const result = await OStore.addProduct(1, 12, 1);
      expect(result).toEqual({
        ...addedProduct,
        id: 2,
      });
    });

    it("tests the functionality of getting the current Order", async () => {
      const result = await OStore.currentOrder(1);
      expect(result).toEqual([
        { ...addedProduct, id: 1 },
        { ...addedProduct, id: 2 },
      ]);
    });

    it("tests the functionality of setStatus", async () => {
      const result = await OStore.setStatus("someOtherStatus", 1);
      expect(result).toEqual({
        ...createdGoodOrder,
        status: "someOtherStatus",
      });
    });
  });
});
