document.getElementById("expenseForm").addEventListener("submit", function (e) {
	e.preventDefault();

	const description = document.getElementById("description").value;
	const amount = parseFloat(document.getElementById("amount").value);
	const category = document.getElementById("category").value;

	addExpense(description, amount, category);
	updateTotalExpenses(amount);

	this.reset();
});

document
	.getElementById("filterCategory")
	.addEventListener("change", function () {
		const category = this.value;
		filterExpenses(category);
	});

function addExpense(description, amount, category) {
	const expenseList = document.getElementById("expenseList");

	const expenseItem = document.createElement("li");
	expenseItem.setAttribute("data-category", category);
	expenseItem.setAttribute("data-amount", amount);
	expenseItem.innerHTML = `
        ${description}: $${amount.toFixed(2)} - ${category}
        <button onclick="removeExpense(this, ${amount})">Remove</button>
    `;

	expenseList.appendChild(expenseItem);
}

function updateTotalExpenses(amount) {
	const totalExpenses = document.getElementById("totalExpenses");
	totalExpenses.textContent = (
		parseFloat(totalExpenses.textContent) + amount
	).toFixed(2);
}

function removeExpense(expenseElement, amount) {
	const totalExpenses = document.getElementById("totalExpenses");
	totalExpenses.textContent = (
		parseFloat(totalExpenses.textContent) - amount
	).toFixed(2);

	expenseElement.parentElement.remove();
}

function filterExpenses(category) {
	const expenses = document.querySelectorAll("#expenseList li");
	let categoryTotal = 0;

	expenses.forEach((expense) => {
		const expenseCategory = expense.getAttribute("data-category");
		const expenseAmount = parseFloat(expense.getAttribute("data-amount"));

		if (category === "All" || expenseCategory === category) {
			expense.style.display = "";
			if (expenseCategory === category) {
				categoryTotal += expenseAmount;
			}
		} else {
			expense.style.display = "none";
		}
	});

	displayCategoryTotal(category, categoryTotal);
}

function displayCategoryTotal(category, amount) {
	const categoryTotalElement = document.getElementById("categoryTotal");
	const categoryTotalAmount = document.getElementById("categoryTotalAmount");

	if (category === "All") {
		categoryTotalElement.style.display = "none";
	} else {
		categoryTotalElement.style.display = "";
		categoryTotalAmount.textContent = amount.toFixed(2);
	}
}