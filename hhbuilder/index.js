(function () {
    /** Variable declarations */
    var household = [],
        ageInput,
        relationshipOptions,
        smoker,
        builder,
        members,
        addBtn,
        submitBtn,
        pre;

    /**
     * Initialization on window load
     */
    function init () {

        ageInput = document.querySelector('input[name="age"]');
        relationshipOptions = document.querySelector('select');
        smoker = document.querySelector('input[type="checkbox"]')
        builder = document.querySelector(".builder");
        members = document.createElement("div");
        addBtn = document.querySelector(".add");
        submitBtn = document.querySelector('button[type="submit"]');
        pre = document.querySelector(".debug");

        members.className= "members";
        addBtn.type = "button";
        ageInput.type = "number";
        ageInput.min = "1";
        pre.style.overFlow = "auto";
        pre.style.width = "500px";
        pre.style.overflow = "auto";

        document.body.appendChild(members);

        attachBtnListeners();
    }

    /** Event Listeners and Related Methods */

    function attachBtnListeners () {
        submitBtn.addEventListener("click", onSubmit);
        addBtn.addEventListener("click", onAdd);
    }

    function onSubmit (e) {
        e.preventDefault();
        if (!household.length) {
            pre.style.display = "none";
            return;
        }

        pre.style.display = "block";
        pre.innerHTML = JSON.stringify(household);
    }

    function onAdd () {
        var age = document.querySelector('input[name="age"]').value;
        var relation = document.querySelector("select").value;
        var isSmoker = smoker.checked;

        if (!validateInput(age, relation)) {
            alert("The age and relationship fields are required. Age must be a number greater than 0");
            return;
        }

        var data = {
            age: age,
            relation: relation,
            smoker: isSmoker,
            visible: false
        };

        addToHousehold(data);
    }

    function addRemoveBtnListener (el) {
        el.onclick = function onRemove () {
            var container = el.parentNode;
            var siblingId = el.previousSibling.dataset.id;
            var idx;

            household.forEach(function (member, i) {
                if (member.id === siblingId) {
                    idx = i;
                    return false;
                }
            });

            if (idx >= 0) {
                household.splice(idx, 1);
                container.parentNode.removeChild(container);
            }
        }
    }

    /**
     * renderMember - to create and render to DOM added member upon clicking add btn
     * @param {Object} member
     */
    function renderMember (member) {
        if (!member.visible) {

            var uid = JSON.stringify(new Date().valueOf());
            var memberContainer = document.createElement("div");
            var addedMemberInfo = document.createElement("span");
            var addedMemberInfo = document.createElement("span");
            var remove = document.createElement("button");
            var age = member.age === 1 ? member.age + " year-old" : member.age + " years old";
            var isSmoker = member.smoker ? "smoker" : "non-smoker";

            member.visible = true;
            member.id = uid;
            memberContainer.classList.add("member-container");
            addedMemberInfo.dataset.id = uid;

            remove.style.display = "inline-block";
            remove.style.fontSize = "16px";
            remove.style.color = "red";
            remove.style.marginLeft = "5px";


            addedMemberInfo.innerText = member.relation + ", " + age + ", " + isSmoker;
            remove.innerText = "remove";
            memberContainer.style.marginBottom = "10px";
            memberContainer.appendChild(addedMemberInfo);
            memberContainer.appendChild(remove);
            members.appendChild(memberContainer);

            addRemoveBtnListener(remove);
        }
    }

    /**
     * addToHousehold
     * @param {Object} data object containing household builder form values
     */
    function addToHousehold (data) {
        household.push(data);
        household.forEach(function (member) {
            renderMember(member);
        })

        clearFields();
    }

    /**
     * Method to clear the form fields after clicking add btn
     */
    function clearFields () {
        ageInput.value = "";
        relationshipOptions.value = "";
        smoker.checked = false;
    }

    function validateInput (age, relation) {
        return (age !== "" && age > 0 && relation !== "");
    }

    window.onload = function () {
        init();
    }

})()