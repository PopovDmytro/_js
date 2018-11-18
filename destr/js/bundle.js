'use strict';/*
Factory
*/function circle(r,locObj){return{radius:r,location:{x:locObj.x,y:locObj.y},draw:function draw(){console.log('draw method')}}}/*
Constructor
*/function Circle(r,locObj){this.radius=r;this.location=locObj;this.draw=function(){console.log('draw method')}}/*
 */// const Circle1 = new Function('r', 'locObj', `
//  this.radius = r;
//     this.location = locObj;
//     this.draw = function() {
//         console.log('draw method');
//     }
//  `);
// const a = new Circle1(123, { x: 1, y: 2 });
/*
Abstract
*/function AbstrFoo(radius){this.radius=radius;var defaultLocation={x:0,y:0};var computeOptimumLocation=function computeOptimumLocation(factor){console.log('computeOptimumLocation '+factor)};this.draw=function(){computeOptimumLocation();console.log('draw')};Object.defineProperty(this,'defaultLocation',{get:function get(){return defaultLocation},set:function set(value){if(!value.x||!value.y){throw new Error('Invalid location')}defaultLocation=value}})}var abstrFoo1=new AbstrFoo(10);// abstrFoo1.defaultLocation = 123;
// abstrFoo1.draw();
/*
 *Exersice 
 */function StopWatch(){var startTime=void 0,endTime=void 0,running=void 0,duration=0;/*/Object.defineProperties(this, {
        startTime: {
            get: function() {
                return startTime;
            }
        },
        endTime: {
            set: function() {
                return endTime;
            }
        },
        duration: {
            get: function() {
                return duration;
            },
            set: function(v) {
                duration = v;
            }
        },
        running: {
            get: function() {
                return running;
            }
        }
    })*/Object.defineProperty(this,'startTime',{get:function get(){return startTime}});Object.defineProperty(this,'endTime',{get:function get(){return endTime}});Object.defineProperty(this,'duration',{get:function get(){return duration},set:function set(v){duration=v}});Object.defineProperty(this,'running',{get:function get(){return running}})}StopWatch.prototype.start=function(){// if (this.startTime) throw new Error('StopWatch has already started.');
// this.startTime = new Date().getTime();
if(this.running)throw new Error('Started');this.running=true;this.startTime=new Date};StopWatch.prototype.stop=function(){// if (!this.durationSeconds) throw new Error('StopWatch has not started.');
// this.durationSeconds = (new Date().getTime() - this.durationSeconds) / 1000;
// this.endTime = new Date().getTime();
if(!this.running)throw new Error('Did not start');this.running=false;this.endTime=new Date;var sec=(endTime.getTime()-startTime.getTime())/1000;this.durationTime+=sec};// StopWatch.prototype.duration = function() {
// return console.log(this.durationSeconds);
// return console.log(this.durationTime)
// }
StopWatch.prototype.reset=function(){// this.durationSeconds = undefined;
this.startTime=null;this.endTime=null;this.running=false;this.duration=0};/*
Inheritance
*/var person={name:'John'};// const objectBase = Object.getPrototypeOf(person);
// const descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString');
Object.defineProperty(person,'name',{writable:false,enumerable:true,configurable:false});function InheritTest(){this.test=1;this.str='line of chars'}InheritTest.prototype.draw=function(){console.log(this);console.log(this.test+this.str)};InheritTest.prototype.arrayFor=Array.prototype.forEach;var x=new InheritTest;// console.log(x.draw());