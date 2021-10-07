//Initialize the function
window.onload = function() {



    //Get all the elements
    myform = document.getElementById('myform')
    studentName = document.getElementById('studentName')
    branchName = document.getElementById('branchName')
    id = document.getElementById('id')
    dynamicHere = document.getElementById('dynamicHere')
    cardBody = document.getElementsByClassName('card-body')[0]

    myform.addEventListener('submit', function(e) {
        e.preventDefault();

        studentNameTxtValue = document.getElementById('studentName').value
        branchNameTxtValue = document.getElementById('branchName').value
        idTxtValue = document.getElementById('id').value


        if (studentNameTxtValue == '' || branchNameTxtValue == '' || idTxtValue == '') {
            UI.messages('Insert All Text Fields', 'danger');
            return
        } else {
            var students = new studentDetails(studentNameTxtValue, branchNameTxtValue, idTxtValue);

            UI.clearFields();
            UI.displayData(students)
            Store.setStored(students)
            UI.messages('Data Inserted', 'success')
        }

    })


    dynamicHere.addEventListener('click', function(e) {
        if (e.target.classList.contains('RemoveIt')) {
            UI.removeRow(e.target)
        }

    })



    class studentDetails{
        constructor(studentNameTxtValue, branchNameTxtValue, idTxtValue) {
            this.student = studentNameTxtValue;
            this.branch = branchNameTxtValue;
            this.id = idTxtValue;
        }
    }

    class UI {
        static clearFields() {
            document.getElementById('studentName').value = ''
            document.getElementById('branchName').value = ''
            document.getElementById('id').value = ''
        }

        static displayData(obj) {
            let     StudentFromLocalStorage = Store.getStored()
            StudentFromLocalStorage.push(obj)
            UI.populateTR(StudentFromLocalStorage)

        }

        static populateTR(StudentFromLocalStorage) {
            StudentFromLocalStorage.forEach(function(onebyone) {
                dynamicHere.innerHTML += ` <tr>
                <td>${onebyone.id}</td>
                <td>${onebyone.student} </td>
                <td>${onebyone.branch}</td>
                <td><button class='btn btn-danger RemoveIt'>X</button></td>
            </tr>`

            })
        }
        static messages(txt, className) {
            let divs = '';
            divs = document.createElement('div')
            divs.classList = `alert alert-${className}`
            divs.innerText = txt;
            cardBody.insertBefore(divs, myform)
            setTimeout(function() {
                divs.remove()
            }, 2000)
        }

        static removeRow(element) {

            id = element.parentElement.parentElement.firstElementChild.innerText

            element.parentElement.parentElement.remove()
            Store.removeStored(id)
        }
    }


    class Store {
        static getStored() {
            let students = ''
            if (localStorage.getItem('student') == null) {
                students = []
            } else {
                students = JSON.parse(localStorage.getItem('student'))
            }
            return students
        }

        static setStored(x) {

            let students = Store.getStored()
            console.log(students)
            students.push(x)
            localStorage.setItem('student', JSON.stringify(students))
        }


        static removeStored(isbn) { 
            let Allvalues = Store.getStored()
            Allvalues.forEach((onebyone, index) => {
                if (onebyone.id == id) {
                    Allvalues.splice(index, 1);
                }
            })

            localStorage.setItem('student', JSON.stringify(Allvalues))
        }



    }



    UI.populateTR(Store.getStored())
}