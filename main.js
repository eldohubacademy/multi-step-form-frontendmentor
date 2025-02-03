//add on label to check corresponding checkbox
document.querySelectorAll(".ad-on-option").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    const checkbox = btn.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
  });
});

//   toglle period effect -- changing values in step 2 and step 3 content(to value/year)
const planLabels = document.querySelectorAll(".plan-label");

const planPrices = {
  monthly: { arcade: "$9/mo", advanced: "$12/mo", pro: "$15/mo" },
  yearly: { arcade: "$90/yr", advanced: "$120/yr", pro: "$150/yr" },
};

const addOnPrices = {
  monthly: { online: "$1/mo", larger: "$2/mo", customizable: "$2/mo" },
  yearly: { online: "$10/yr", larger: "$20/yr", customizable: "$20/yr" },
};

let isYearly = false; 

const toggleButton = document.getElementById("toggleBtn");
// Toggle between monthly and yearly pricing
toggleButton.addEventListener("click", () => {
  isYearly = !isYearly; //
  toggleButton.classList.toggle("active", isYearly);
  updatePrices();
});

// Update pricing based on the selected period - both step 2 and step 3
function updatePrices() {
  const selectedPlanPrices = isYearly ? planPrices.yearly : planPrices.monthly;
  planLabels.forEach((label) => {
    const planId = label.getAttribute("for");
    const priceTag = label.querySelector("p:nth-child(2)");
    priceTag.textContent = selectedPlanPrices[planId];
  });
}

// Handling steps

const steps = document.querySelectorAll(".step");
const contents = document.querySelectorAll(".content-div");

let currentStep = 0;

// Show the current step content
function showStep(stepIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle("active-button", index === stepIndex);
    contents[index].classList.toggle("active-content", index === stepIndex);
  });
  currentStep = stepIndex;
  console.log(currentStep);

  if (currentStep == 2) {
    // update prices f step 3
    const addOnOptions = document.querySelectorAll(".add-on-option");
    const selectedAddOnPrices = isYearly
      ? addOnPrices.yearly
      : addOnPrices.monthly;
    addOnOptions.forEach((option) => {
      const optionChosen = option.getAttribute("id").split("-")[2];
      const optionTag = option.children[2];
      optionTag.textContent = selectedAddOnPrices[optionChosen];
    });
  }
}

// Navigation buttons
document.querySelectorAll(".next").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      showStep(currentStep + 1);
    }
  });
});

document.querySelectorAll(".go-back").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });
});

// Initialize the form
showStep(currentStep);
updatePrices();
