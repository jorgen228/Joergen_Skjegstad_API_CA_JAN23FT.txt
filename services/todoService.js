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
  async create(name) {
    return await this.Todo.create({
      name: name,
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
  async delete(id) {
    return await this.Todo.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = TodoService;
