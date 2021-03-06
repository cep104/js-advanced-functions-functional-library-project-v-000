const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    // 1) calls alert with each element passed
    // 2) calls alert properly on object values
    // 3) returns the original collection
    each: function(collection, callback) {
      // collection is an array or an object 
      // callback is the function so in this case alert.
      if (Array.isArray(collection)) {
        // array [1,2,3,4]
        // console.log( collection)
        collection.forEach(element => 
          callback(element)
        );
      } else { // collection is an Object
        console.log(collection)
        for (const key in collection) {
          // if (collection.hasOwnProperty(key)) {
            //object { one: 1, two: 2, three: 3, four: 4 }
            const element = collection[key];
            // console.log(key) //one, two, three
            // console.log(element) //1,2,3
            callback(element) // alert(1), alert(2)
          // }
        }
      }
      return collection //return original collection
    },

    // 1) successfully returns a correctly populated array
    // // does not modify the original array
    //  2) successfully returns a correctly populated array from modified object values
    //  // does not modify the original object
    map: function(collection, callback) {
      let newCollection = [] //new array to return it as a new array

      if (Array.isArray(collection)) {
        collection.forEach(element => 
          newCollection.push(callback(element))
        );
      } else { // collection is an Object
        for (const key in collection) {
          if (collection.hasOwnProperty(key)) {
            const element = collection[key];
            newCollection.push(callback(element))
          }
        }
      }
      // console.log(newCollection) array of collection 
      return newCollection
      
    },

    // 1) returns the correct reduced value when passed an initial value
    // 2) returns the correct reduced value when not passed an initial value
    // 3) does not modify the original array
    reduce: function(collection, callback, acc) {
      console.log(acc)
      let total = (acc) ? acc : collection[0] 
      //if there is a acc start there otherwise start with first element in collection for reduce
      let i = (acc) ? 0 : 1
      //if there is an acc start the count at first element otherwise start at second.
      for ( i; i < collection.length; i++) {
        total = callback(total, collection[i], collection)
        //look at readme and how the callback is being used. 
      }
      return total
    },

    // Looks through each value in the collection, returning the first one that passes a truth test (predicate), or undefined if no value passes the test. 
    // The function returns as soon as it finds an acceptable element, and doesn't traverse the entire collection.
    find: function(collection, predicate) {
      // if collection is an object, make values an array
      if (!(Array.isArray(collection))) {
        collection = Object.values(collection)
      }
      // iterate over collection array until predicate true
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          return collection[i]
          //running each number of the array through the function in the readme 
          //once the function is even return that number
        }
      }
    },

    // Looks through each value in the collection, returning an array of all the values that pass a truth test (predicate).
    // 1) correctly filters for values that the callback evaluates as true
    filter: function(collection, predicate) {
      let truthValues = []
      // if collection is an object, make values an array
      if (!(Array.isArray(collection))) {
        collection = Object.values(collection)
      }
      // iterate over collection array and push predicate(collection[i]) values into new array
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i])) {
          truthValues.push(collection[i])
        }
      }
      // return array of all the values that pass truth test (predicate)
      return truthValues
    },

    // Return the number of values in the collection
    // 1) correctly returns the size of the collection when an array is passed
    // 2) correctly returns the size of the collection (amount of keys) when an object is passed
    size: function(collection) {
      // if collection is an object, make values an array
      if (!(Array.isArray(collection))) {
        collection = Object.values(collection)
      }
      // Return the number of values in the collection
      return collection.length
    },

    // Returns the first element of an array. 
    // Passing n will return the first n elements of the array.
    // 1) returns the first element of the collection
    // 2) returns the first n elements of the collection when the second optional argument (n) is provided
    first: function(array, num) {
      let n = (num) ? num : 1
      let nArray = array.slice(0, n)

      return (num) ? nArray : nArray[0]
    },

    // Returns the last element of an array. Passing n will return the last n elements of the array.
    // 1) returns the last element of the collection
    // 2) returns the last n elements of the collection when the second optional argument (n) is provided
    last: function(array, num) {
      let n = (num) ? -num : -1
      //getting last element of array is -1
      //if your getting multiple start on -that number so if n = 2 it would be -2
      let nArray = array.slice(n)
      // console.log(array.slice(-2))
      // console.log(nArray[0]) returns first element of slice if function only wants one number
      return (num) ? nArray : nArray[0]
    },

    // Returns a copy of the array with all falsy values removed. 
    // In JavaScript, false, null, 0, "", undefined and NaN are all falsy.
    compact: function(array) {
      let compactArray = []

      for (const i of array) {
        if (i) {
          //if i = true push into new array
          compactArray.push(i)
        }
      }
      return compactArray
    },

    // Returns a sorted copy of array, ranked in ascending order by the results of running each value through callback. 
    // The values from the original array should be retained within the sorted copy, just in ascending order.
    // 1) correctly sorts arrays of integers and arrays of strings
    // 2) does not modify the original arrays
    // 3) correctly sorts arrays of integers with non-standard sort
    sortBy: function(array, callback) {
      let sortedArray = [...array]
      // copies array
      return sortedArray.sort(function(a,b) {
        return callback(a) - callback(b)
      })
    },
    // function compareNumbers(a, b) {
      // return a - b;
    // } how you can compare numbers using sort. 

 
        flatten: function flatten(array, shallow){
      let newArr = []
      for(var i in array){
        if (shallow === true){
          // console.log(array)
          if(Array.isArray(array[i])) {
            // console.log(array[i])
              newArr = newArr.concat(array[i])
          } else {
              newArr.push(array[i])
          }
        }
        else {
          if(Array.isArray(array[i])) {
            console.log(flatten(array[i]))
              newArr = newArr.concat(flatten(array[i]))
          } else {
              newArr.push(array[i])
          }
        }
      }
      return newArr
    },

       // unpack: function(receiver, arr) {
    //   for (let val of arr)
    //     receiver.push(val)
    // },

    // flatten: function(collection, shallow, newArr=[]) {
    //   console.log(shallow)
    //   if (!Array.isArray(collection)) return newArr.push(collection)
    //   if (shallow) {
    //     for (let val of collection)
    //       Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
    //   } else {
    //     for (let val of collection) {
    //       this.flatten(val, false, newArr)
    //     }
    //   }
    //   return newArr
    // },
   
    // Produces a duplicate-free version of the array, using === to test object equality. 
    // In particular only the first occurrence of each value is kept.


     uniq: function(array, isSorted, callback) {
      let uniqueArray
      if (callback) {
        let arr = [... array].map(element => callback(element))
        uniqueArray = array.filter( (value, index, array) => arr.indexOf(callback
          
          (value)) === index);
      } else {
        uniqueArray = [...new Set(array)]
      }
      return uniqueArray;
    },
    // Retrieve all the names of the object's own enumerable properties.
    keys: function(object) {
      let keysArray = []

      for (const key in object) {
        keysArray.push(key) 
      }

      return keysArray
    },

    // Return all of the values of the object's own properties
    values: function(object) {
      let valuesArray = []

      for (const key in object) {
        valuesArray.push(object[key]) 
      }

      return valuesArray
    },

    // returns a sorted collection of the names of every method in an object
    functions: function(object) {
      let sortedArray = []
      
      for (const key in object) {
        if (typeof object[key] === 'function') {
          sortedArray.push(key)
        }
      }
      
      return sortedArray.sort()
    },
  }
})()

fi.libraryMethod()





// const fi = (function() {
//   return {
//     libraryMethod: function() {
//       return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
//     },

//     each: function(collection, callback) {
//       // console.log(collection)
//       // console.log(Object.values(collection))
//       for (let element of Object.values(collection)){
//         // Object.values(collection) returns the values of the collection.
//         // element is each value of the collection 
//         callback(element)
//         // runs each value through the callback
//       }
//       return collection; 
//       // returns the original collection
//     },

//     // each: function(collection, alert) {
//     //   for (const c in collection){
//     //     alert(collection[c])
//     //   }
//     //   return collection
//     // }

//     map: function(collection, callback) {
//       let array = []; 
//       for (const c in collection) {
//         array.push(callback(collection[c]))
//       }
//       return array
//     },

//     reduce: function(collection, callback, acc) {
//       let newCollection = collection.slice();
      
//       if (!acc) {
//         acc = newCollection[0];
// 				newCollection = collection.slice(1);
//       }
      
//       for (let i = 0; i < newCollection.length; i++){
//         acc = callback(acc, newCollection[i], collection);
//       }
//       return acc;
//     },

//     find: function(collection, predicate) {
//       for (const c in collection) {
//         if(predicate(collection[c]) === true) {
//           return collection[c]
//         }
//       }
//     },

//     filter: function(collection, predicate) {
//       const newArray = []
//       for (const c in collection) {
//         if(predicate(collection[c]) === true) {
//           newArray.push(collection[c])
//         }
//       }
//       return newArray
//     },

//     size: function(collection) {
//       return Object.keys(collection).length
//     },

//     first: function(array, n) {
//       const newArr = []
//       if (n === undefined) {
//         return array[0]
//       } else {
//         return array.slice(0, n)
//       }
//     },

//     last: function(array, n) {
//       const newArr = []
//       if (n === undefined) {
//         return array[array.length-1]
//       } else {
//         return array.slice(array.length - n)
//       }
//     },

//     compact: function(array) {
//       const newArr = []
//       for (const i in array){
//         if (array[i]) {
//           newArr.push(array[i])
//         }
//       }
//       return newArr
//     },

//     sortBy: function(arr, iteratee){
//       return [...arr].sort(function(a,b) {return iteratee(a) - iteratee(b)})
//     },

//     flatten: function flatten(array, shallow){
//       let newArr = []
//       for(var i in array){
//         if (shallow === true){
//           if(Array.isArray(array[i])) {
//               newArr = newArr.concat(array[i])
//           } else {
//               newArr.push(array[i])
//           }
//         }
//         else {
//           if(Array.isArray(array[i])) {
//               newArr = newArr.concat(flatten(array[i]))
//           } else {
//               newArr.push(array[i])
//           }
//         }
//       }
//       return newArr
//     },

//     uniq: function(array, isSorted, callback) {
//       let uniqueArray
//       if (callback) {
//         let arr = [... array].map(element => callback(element))
//         uniqueArray = array.filter( (value, index, array) => arr.indexOf(callback(value)) === index);
//       } else {
//         uniqueArray = [...new Set(array)]
//       }
//       return uniqueArray;
//     },

//     keys: function(object) {
//       let keyCollection = [];
//       for (const key in object) {
//         keyCollection.push(key)
//       }
//       return keyCollection;
//     },
 
//     keys: function(obj) {
//       return Object.keys(obj)
//     },
 
//     values: function(obj) {
//       return Object.values(obj)
//     },
 
 
//      functions: function(fi) {
//        let newArr = []
//         for(var i in fi){
//           if(typeof fi[i] == "function" ){
//           newArr.push(fi[i])
//           }
//         }
//       newArr.sort()
//       return newArr
//     },


//   }
// })()

// fi.libraryMethod()
