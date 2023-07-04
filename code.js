
const people = [
  { name: "John", age: 25 },
  { name: "Emily", age: 30 },
  { name: "Michael", age: 20 },
  { name: "Sarah", age: 35 }
];

function isAbove25(element){
  return element.age>25;
}

console.log(people.filter(isAbove25))


{/* <template class="hour--card--template">
          <td>
            <div class="info--group">
              <div class="label">Thursday</div>
              <div ><span data-time></span> <span data-meridian></span> </div>
            </div>
          </td>
          
          <td>
            <img class="weather-icon" data-icon alt="" srcset="">
          </td>
          <td>
            <div class="info--group">
              <div class="label">Temp</div>
              <div class="day--card-temp"><span data-temp class="day--card.temp"></span>°</div>
            </div>
          </td>
          
          <td>
            <div class="info--group">
              <div class="label">FL-Temp</div>
              <div class="day--card-temp"><span data-temp-fl class="day--card.temp"></span>°</div>
            </div>
          </td>
          
          <td>
            <div class="info--group">
              <div class="label">Wind</div>
              <div><span data-wind></span> <span class="sub--group--value">mph</span></div>
            </div>
          </td>
          
          <td>
            <div class="info--group">
              <div class="label">Precip</div>
              <div><span data-precip></span> <span class="sub--group--value">in</span></div>
            </div>
          </td>
        </template> */}