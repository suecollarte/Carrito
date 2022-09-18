const { error } = require('console');

const fs =require('fs').promises;

class ContenedorProducto {

    constructor (archivo){
          this.archivo=archivo
          
    }

    async getById(j)
    {
        const todo= await this.getAll();
        
        
        try{
          const encontrar = todo.find(elemento => elemento.id == j)
        
        console.log(encontrar);  
            
            return encontrar    
        } catch (error){
            return []
      
        }
    }

    async getAll(){
   
        try{
    
            const contenido=  await fs.readFile(this.archivo,'utf-8'); //sincrono solo se ejecuta este primero
            const datos=JSON.parse(contenido); //parse lo pone este string como array
            return datos;
        }
    
        catch (error){
          return []
    
        }
    
        
    }
    
   
    
    async save(e){
    const obj= await this.getAll();
    //console.log(e);
    const obj1=obj.map(function(obj2){
    return obj2;
    });
    
    obj1.push(e);
    
     obj1[(obj1.length -1)].id= (obj1.length -2);
     console.log((obj1.length -2));
    const paso=JSON.stringify(obj1,null,2);
  
        try {
    
        fs.writeFile(this.archivo,paso);
       
        } 
        catch (err){
    
            throw new Error (`Error:${error}`) 
    
        }
    
    }
    
    

    async deleteAll(){

        try {
        await fs.writeFile(this.archivo,JSON.stringify('[]',null,2));
        }   
        catch (err){
    
            throw new Error (`Error:${error}`) 
        
            }
    
}



    async deletebyId(j){
    
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
    
        await fs.writeFile(this.archivo,JSON.stringify(arr2,null,2));
    
        } 
        catch (err){
    
        console.log('error',err);
    
        }

    
    
}
}

module.exports=ContenedorProducto;