import { Model, Document } from "mongoose";

class CrudRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(query: any): Promise<T> {
    try {
      const item = new this.model(query);
      return await item.save();
    } catch (error) {
      throw new Error(`Error creating record: ${error}`);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(`Error finding record by id: ${error}`);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(`Error finding all records: ${error}`);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating record: ${error}`);
    }
  }

  async delete(id: string): Promise<T | null> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting record: ${error}`);
    }
  }

  async findOne(query: any): Promise<T | null> {
    try {
      return await this.model.findOne(query);
    } catch (error) {
      throw new Error(`Error finding one record: ${error}`);
    }
  }
}

export default CrudRepository;
