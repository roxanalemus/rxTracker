const trash = document.getElementsByClassName("fa-trash");
const record = document.getElementsByClassName("recordButton");
const recordInput = document.getElementsByClassName("timeTakenInput");

Array.from(record).forEach(function(element) {
  element.addEventListener('click', function(e){
    let id = e.target.value;
    let time = e.target.previousElementSibling.value;
    console.log(time)
    console.log(id);
    fetch('recordTaken', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'time': time,
        'id': id,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function (e) {
    let id = e.target.value;
    console.log(id)
    fetch("medicine", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": id,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
