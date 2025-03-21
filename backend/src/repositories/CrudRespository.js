"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class CrudRepository {
    constructor(model) {
        this.model = model;
    }
    create(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = new this.model(query);
                return yield item.save();
            }
            catch (error) {
                throw new Error(`Error creating record: ${error}`);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findById(id);
            }
            catch (error) {
                throw new Error(`Error finding record by id: ${error}`);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find();
            }
            catch (error) {
                throw new Error(`Error finding all records: ${error}`);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByIdAndUpdate(id, { $set: data }, { new: true });
            }
            catch (error) {
                throw new Error(`Error updating record: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByIdAndDelete(id);
            }
            catch (error) {
                throw new Error(`Error deleting record: ${error}`);
            }
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne(query);
            }
            catch (error) {
                throw new Error(`Error finding one record: ${error}`);
            }
        });
    }
}
exports.default = CrudRepository;
