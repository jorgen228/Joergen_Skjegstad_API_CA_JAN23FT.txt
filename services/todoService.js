class TodoService {
  constructor(db) {
    this.client = db.sequelize;
    this.Todo = db.Todo;
  }
  async getAll() {
    return await this.Todo.findAll({
      where: {},
    });
  }
  async getOne(name) {
    return this.Todo.findOne({
      where: {
        name: name,
      },
    });
  }
  async create(name, categoryID, userId) {
    return await this.Todo.create({
      name: name,
      CategoryId: categoryID,
      UserId: userId,
    });
  }
  async update(oldname, newName) {
    return await this.Todo.update(
      { name: newName },
      {
        where: {
          name: oldname,
        },
      }
    );
  }
  async delete(name) {
    return await this.Todo.destroy({
      where: {
        name: name,
      },
    });
  }
}

module.exports = TodoService;
