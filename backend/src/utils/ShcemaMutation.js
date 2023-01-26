

class ShcemaMutation {
  constructor({ model, type, addArgs, name , id, updateArgs }) {
    this.model = model
    this.type = type
    this.addArgs = addArgs
    this.name = name
    this.id = id
    this.updateArgs = updateArgs
  }

  addItem = () => {
    return {
      type: this.type,
      args: this.addArgs,
      resolve:(parent, args) => {
        const map = {}
        this.getNameProperty().forEach(item => map[item] = args[item] ) 
        return new this.model(map).save(); 
      },
    };
  }

  removeItem = () => {
    return {
      type: this.type,
      args: this.id,
      resolve:(parent, args) => {
        return this.model.findByIdAndDelete(args.id);
      }
    }    
  }

  updataItem = () => {
    return {
      type: this.type,
      args: this.updateArgs,
      resolve:(parent, args) => {
        const map = {}
        this.getNamePropUpdate().forEach(item => map[item] = args[item])
        return this.model.findByIdAndUpdate(
          args.id,
          { $set: map },
          { new: true },
          );
        }
    }
  }

  get addRemUpMethods() {
    const map = {}
    const addName = `add${this.name}`
    const removeName = `remove${this.name}`
    const updateName = `update${this.name}`
    map[addName] = this.addItem()
    map[removeName] = this.removeItem()
    map[updateName] = this.updataItem()

    // console.log(map)
    return map
  }

  getNameProperty = () =>  {
  return Object.keys(this.addArgs).map(item => item) 
  }

  getNamePropUpdate = () =>  {
  return Object.keys(this.updateArgs).map(item => item !== 'id' && item) 
  }

}

export { ShcemaMutation };
