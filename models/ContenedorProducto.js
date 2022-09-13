const fs =require('fs').promises;

class ContenedorProducto {

    constructor (archivo){
          this.archivo=archivo
          
    }

    async getById(j)
    {
        try{
            let todo= await this.getAll();
            const encontrar = todo.find(o =o.id == j)
            return encontrar    
        } catch (error){
            return []
      
        }
    }

    async getAll(){
    
        try{
    
            const contenido=  await fs.readFileSync(this.archivo,'utf-8'); //sincrono solo se ejecuta este primero
            const datos=JSON.parse(contenido); //parse lo pone este string como array
            return datos;
        }
    
        catch (error){
          return []
    
        }
    
        
    }
    
   
    
    async save(e){
    const obj= await this.getAll();
    const obj1=obj.map(function(obj2){
    return obj2;
    });

    //ContenedorProducto.array=obj1;
    obj1.push(e);
   
    const paso=JSON.stringify(obj1,null,2);

        try {
    
        fs.writeFileSync(this.archivo,paso);
       //console.log('Largo actual:'+obj1.length);
        } 
        catch (err){
    
            throw new Error (`Error:${error}`) 
    
        }
    
    }
    
    

    async deleteAll(){

        try {
        await fs.writeFileSync(this.archivo,JSON.stringify('[]',null,2));
        }   
        catch (err){
    
            throw new Error (`Error:${error}`) 
        
            }
    
}



    deletebyId(j){
    
    let todo= this.getAll();
    
    const arr=todo.map(function(obj){
        return obj;
    });
    
    let arr2=[];
    for(let i=0;i< arr.length;i++)
    {
        if(i==j){
           
            console.log('se borra el elemento',i); i=i+1;
        }else{
        let obj1=arr[i];
        arr2.push(obj1);
       }
    }
   
    console.log('Largo Nuevo array',arr2.length);
    try {
    
        fs.writeFileSync(this.archivo,JSON.stringify(arr2,null,2));
    
        } 
        catch (err){
    
        console.log('error',err);
    
        }

    
    
}
}

module.exports=ContenedorProducto;