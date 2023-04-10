class CategoryService {
  constructor(db) {
    this.client = db.sequelize;
    this.Category = db.Category;
  }
  async getAll() {
    return await this.Category.findAll({
      where: {},
    });
  }
  async getOne(name) {
    return this.Category.findOne({
      where: {
        name: name,
      },
    });
  }
  async create(name) {
    return await this.Category.create({
      name: name,
    });
  }
  async update(oldname, newName) {
    return await this.Category.update(
      { name: newName },
      {
        where: {
          name: oldname,
        },
      }
    );
  }
  async delete(name) {
    return await this.Category.destroy({
      where: {
        name: name,
      },
    });
  }
}

module.exports = CategoryService;
