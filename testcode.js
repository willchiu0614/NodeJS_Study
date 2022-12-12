function doSomething1() { 
    console.log('doSomething1 start') 
    return new Promise(function(resolve, reject) { 
       setTimeout(function() { 
          console.log('doSomething1 end') 
          resolve(1) }, 1) 
    }) 
 } 
 function doSomething2() { 
    console.log('doSomething2 start') 
    return new Promise(function(resolve, reject) { 
       setTimeout(function() { 
          console.log('doSomething2 end') 
          resolve(2) }, 1) 
    }) 
 } 
 function finalThing(value) { 
    console.log('finalThing start') 
    return new Promise(function(resolve, reject) { 
       setTimeout(function() { 
          console.log('finalThing end') 
          console.log(value) 
          resolve(0) }, 1) 
    }) 
 } 
 
 // 第 3 種傳入參數 
doSomething1() 
.then(function() { 
   doSomething2() 
}) 
.then(finalThing)
console.log('test3 end') //

 
 
 