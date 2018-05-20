// declaring variables I will use globally - got behavior I did not expect otherwise
// I don't understand why yet, so I will have to follow up later for learning purposes

// where I store the first number (first row of the calculator)
var firstNum = "";
// where I store the 2nd num (after the operator)
var secondNum = "";
// where I store the operator (plus, minus, times, etc.)
var oper = "";
// this is the variable I will use to print to the calculator so the user sees +, -, etc.
var prettyOper = "";
// this is where I store the result of the calculation
var result = "";
// this is the flag I use to track whether a calculation has been made yet
var resultComputed = false;

// because it's good practice to do this with jQuery, I guess
$(document).ready(function() {

    // this block of code has to do only with the operator buttons (add, subtract, divide, multiply, power)
    // the reason we can deal with the different types of buttons separately is because
    // the set of operator buttons, the set of number buttons, and the "set of equal buttons" has an intersection of 0
    // if this doesn't make sense, don't sweat it - it has nothing to do with programming - https://en.wikipedia.org/wiki/Intersection_(set_theory)
    $(".operator").on("click", function() {
        // if firstNum is empty, tell the user to type a number before hitting +, -, etc.
        if (!firstNum) {
            console.log("type a number first!")
            $("#result").text("type a number first");
        }
        // if a calculation has already been made (that is to say, the = button has been pressed),
        // tell the user to clear the calc first
        else if (resultComputed) {
            console.log("press clear first");
            $("#result").text(result + ", press clear");
        }
        // otherwise, accept the input that the user made
        // I allow the user to change their mind before hitting the = button,
        // as I have no code to block them from changing between operators (for example, from + to -)
        else {
            // set the value of var oper based on the value attribute of the button that was clicked
            oper = $(this).attr("value");
                // this code should be straightforward...
                // if they hit the button that corresponds to "plus", set prettyOper to "+".
                // Similar deal for all the other operators, but with the appropriate mathematical operation.
                if (oper === "plus") {
                    prettyOper = "+";
                }
                else if (oper === "minus") {
                    prettyOper = "-";
                }
                else if (oper === "times") {
                    prettyOper = "x";
                }
                else if (oper === "divide") {
                    prettyOper = "÷";
                }
                else if (oper === "power") {
                    prettyOper = "^";
                }
            // display the var prettyOper to the user in the area of the HTML with id operator
            $("#operator").text(prettyOper);
            console.log("oper: " + oper);      
        } 
    })

    // this area listens to clicks on buttons with class number
    $(".number").on("click", function() {
        // if var result is empty...
        if (!resultComputed) {
            // ... and if var oper is empty, meaning the operator key has not yet been pressed
            if (oper === "") {
                // make it so the pressed numbers are associated with the first line
                firstNum += $(this).attr("value");
                $("#first-number").text(firstNum);
                console.log("1st line number pressed: " + firstNum);
            }
            // otherwise, make it so the numbers go to the 2nd line
            else if (oper) {
                secondNum += $(this).attr("value");
                $("#second-number").text(secondNum);
                console.log("2nd line number pressed: " + secondNum);
            }
        }
        // but if var result is not empty (implying that a calculation has already been made)
        else {
            console.log("clear the calc first")
            // tell the user to press clear - we use the result area for this
            $("#result").text(result + ", press clear");
        }

    })

    // this block deals solely with the = button
    $(".equal").on("click", function() {
        // if var secondNum is empty...
        // note the way we wrote our code, secondNum can only be written to after firstNum and oper
        // so, we only need to check secondNum!  nice!
        if (!secondNum) {
            console.log("you didn't finish your inputs yet. type your numbers and operator.")
            // ...tell the user to finish inputting first
            $("#result").text("finish your inputs first");
        }
        // otherwise...
        else {
            // flip resultComputed to true
            // I use this flag to prevent the user from interacting with the operators until they clear their calc
            resultComputed = true;
            // if var oper contains "plus"...
            if (oper === "plus") {
                // parse firstNum and secondNum to integers, then add them together
                // I won't annotate the other operations as they are very similar
                result = parseInt(firstNum) + parseInt(secondNum);
                $("#result").text(result);
            }
            else if (oper === "minus") {
                result = parseInt(firstNum) - parseInt(secondNum);
                $("#result").text(result);
            }
            else if (oper === "times") {
                result = parseInt(firstNum) * parseInt(secondNum);
                $("#result").text(result);
            }
            else if (oper === "divide") {
                result = parseInt(firstNum) / parseInt(secondNum);
                $("#result").text(result);
            }
            else if (oper === "power") {
                result = Math.pow(parseInt(firstNum), parseInt(secondNum))
                $("#result").text(result);
            }
        };
    })

    // this block deals solely with clearing the calculator
    // when the clear button is clicked...
    $(".clear").on("click", function() {
        // reset all our variables to the initial state of the calculator
        // firstNum, secondNum, oper, result are set to empty string
        // resultComputed set to false
        firstNum = "";
        secondNum = "";
        oper = "";
        result = "";
        resultComputed = false;
        // update our calculator displays with the values of their corresponding variables
        // this makes the calculator look cleared to the user
        $("#first-number").text(firstNum);
        $("#second-number").text(firstNum);
        $("#operator").text(firstNum);
        $("#result").text(firstNum);
    })
})