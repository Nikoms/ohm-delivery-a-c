const ResistancesRegistry = require("../../src/registries/resistances");

describe("ResistancesRegistry", () => {
  describe("getOhmById", function () {
    test("with an invalid ID, returns undefined", async () => {
      expect(await ResistancesRegistry.getOhmById("xx")).not.toBeDefined();
    });

    test("with an client tracking ID, returns ohm", async () => {
      expect(await ResistancesRegistry.getOhmById("1e62adfe")).toBeDefined();
    });

    test("with an driver tracking ID, returns ohm", async () => {
      expect(await ResistancesRegistry.getOhmById("50f91bafbb")).toBeDefined();
    });
  });

  describe("setOhmStatus", function () {
    describe("with a customer tracking ID", () => {
      test("always fail", async () => {
        expect(
          await ResistancesRegistry.setOhmStatus("1e62adfe", "DELIVERED")
        ).not.toBeDefined();
      });
    });
    describe("with a driver tracking ID", () => {
      test("with an unknown status, fails", async () => {
        await expect(ResistancesRegistry.setOhmStatus("50f91bafbb", "DFDSFFDS")).rejects.toBeDefined();
      });
      test("with an invalid status, fails", async () => {
        await expect(ResistancesRegistry.setOhmStatus("50f91bafbb", "CREATED")).rejects.toBeDefined();
      });
      test("with an correct status, succeeds", async () => {
        expect(await ResistancesRegistry.setOhmStatus("50f91bafbb", "DELIVERED")).toBeDefined();
      });
    });
  });
});
