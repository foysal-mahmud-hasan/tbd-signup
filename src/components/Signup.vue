<script setup>
import axios from 'axios';
import 'primeicons/primeicons.css'
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { ref, watch } from 'vue';

const toast = useToast();

// Declare form and validation error objects as refs
const form = ref({
    name: "",
    shop_name: "",
    mobile: "",
    email: "",
    address: "",
    products: []
});

const validationErrors = ref({
    name: "",
    shop_name: "",
    mobile: ""
});

// Function to show warnings
const showWard = (summary, detail) => {
    toast.add({
        severity: 'warn',
        summary: summary,
        detail: detail,
        group: 'br',
        life: 5000
    });
};

// Function to validate each field
const validateField = (fieldName, value) => {
    switch (fieldName) {
        case 'name':
            validationErrors.value.name = !value.trim()
                ? "Name is required" : "";
            break;
        case 'shop_name':
            validationErrors.value.shop_name = !value.trim()
                ? "Shop Name is required" : "";
            break;
        case 'mobile':
            if (!value) {
                validationErrors.value.mobile = "Mobile Number is required";
            } else if (!/^\d+$/.test(value)) {
                validationErrors.value.mobile = "Mobile Number must contain only numbers";
            } else if (value.length < 10 || value.length > 15) {
                validationErrors.value.mobile = "Must be a valid mobile number";
            } else {
                validationErrors.value.mobile = "";
            }
            break;
        case 'email':
            if (!value) {
                validationErrors.value.email = "";
            } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                validationErrors.value.email = "Invalid email format";
            } else {
                validationErrors.value.email = "";
            }
            break;
    }
};

// Watchers to trigger validation on field changes
watch(() => form.value.name, (newValue) => validateField('name', newValue));
watch(() => form.value.shop_name, (newValue) => validateField('shop_name', newValue));
watch(() => form.value.mobile, (newValue) => validateField('mobile', newValue));
watch(() => form.value.email, (newValue) => validateField('email', newValue));

// Form submission logic
const submit = () => {
    // Perform validation before submission
    Object.keys(form.value).forEach(key => {
        validateField(key, form.value[key]);
    });

    //validation check
    if (Object.values(validationErrors.value).some(error => error)) {
        if (Object.values(validationErrors.value).some(error => error !== "")) {
            showWard('Validation Error', 'Please correct the errors before submitting.');
            return;
        }
    }
    console.log(form.value)
    // Make an API request (Replace with actual URL)
    // axios.post('YOUR_API_URL', form.value)
    //     .then(response => {
    //         // Handle success
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         // Handle error
    //         console.error(error);
    //         showWard('Error', 'An error occurred while submitting the form.');
    //     });
};

</script>

<template>
    <Toast group="br" position="bottom-right" />
    <div class="min-h-screen min-w-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div
            class="w-full sm:max-w-xl sm:max-h-full mt-6 shadow-md overflow-hidden sm:rounded-lg flex-grow sm:flex-grow-0">
            <div class="flex flex-col items-center mb-4">
                <h2 class="text-3xl mt-2 font-semibold text-[#4a4b68] text-center">Welcome to Pos Keeper</h2>
                <h2 class="text-3xl mt-2 font-semibold text-[green] text-center">Poultry POS</h2>
            </div>
            <div class="bar"></div>
            <div class="w-full px-6 py-4 overflow-y-auto">
                <form @submit.prevent="submit">
                    <div class="max-h-screen overflow-y-auto">
                        <div class="p-4">
                            <div class="mt-4 flex-1">
                                <label class="text-sm text-[#4a4b68]">Shop Name <span
                                        style="color: red;">*</span></label>
                                <InputText v-model="form.shop_name" class="w-full p-2 input-field"
                                    placeholder="Shop Name" />
                                <small v-if="validationErrors.shop_name" class="text-xs text-red-600">
                                    {{ validationErrors.shop_name }}
                                </small>
                            </div>
                            <div class="mt-4 flex-1">
                                <label class="text-sm text-[#4a4b68]">Name <span style="color: red;">*</span></label>
                                <InputText v-model="form.name" class="w-full p-2 input-field" placeholder="Name" />
                                <small v-if="validationErrors.name" class="text-xs text-red-600">
                                    {{ validationErrors.name }}
                                </small>
                            </div>
                            <div class="mt-4 flex-1">
                                <label class="text-sm text-[#4a4b68]">Mobile <span style="color: red;">*</span></label>
                                <InputText v-model="form.mobile" class="w-full p-2 input-field" placeholder="Mobile" />
                                <small v-if="validationErrors.mobile" class="text-xs text-red-600">
                                    {{ validationErrors.mobile }}
                                </small>
                            </div>
                            <div class="mt-4 flex-1">
                                <label class="text-sm text-[#4a4b68]">Email</label>
                                <InputText type="email" v-model="form.email" class="w-full p-2 input-field"
                                    placeholder="Email" />
                                <small v-if="validationErrors.email" class="text-xs text-red-600">
                                    {{ validationErrors.email }}
                                </small>
                            </div>
                            <div class="mt-4">
                                <label class="text-sm text-[#4a4b68]">Address <span style="color: red;">*</span></label>
                                <InputText type="text" v-model="form.address" class="w-full p-2 input-field"
                                    placeholder="Address" />
                            </div>
                            <div class="flex flex-col items-start md:items-center mt-8">
                                <p class="text-black font-extrabold text-xl">Choose your product</p>
                                <div class="items-start">
                                    <div class="flex flex-col sm:flex-row md:flex-row gap-4 mt-6">
                                        <label class="flex items-center cursor-pointer space-x-2">
                                            <input v-model="form.products" type="checkbox" value="Nourish"
                                                class="w-6 h-6 border border-gray-400 rounded focus:ring-0 accent-green-500 text-green-500" />
                                            <span>Nourish</span>
                                        </label>
                                        <label class="flex items-center space-x-2 mt-2 md:mt-0">
                                            <input v-model="form.products" type="checkbox" value="CP"
                                                class="w-6 h-6 border border-gray-400 rounded focus:ring-0 accent-green-500 text-green-500" />
                                            <span>CP</span>
                                        </label>
                                        <label class="flex items-center space-x-2 mt-2 md:mt-0">
                                            <input v-model="form.products" type="checkbox" value="Kazi"
                                                class="w-6 h-6 border border-gray-400 rounded focus:ring-0 accent-green-500 text-green-500" />
                                            <span>Kazi</span>
                                        </label>
                                        <label class="flex items-center space-x-2 mt-2 md:mt-0">
                                            <input v-model="form.products" type="checkbox" value="Aman"
                                                class="w-6 h-6 border border-gray-400 rounded focus:ring-0 accent-green-500 text-green-500" />
                                            <span>Aman</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-4">
                            <div class="justify-between items-center">
                                <div class="flex items-center justify-center w-full sm:w-auto mb-6 md:mb-2">
                                    <Button type="submit" label="Build Store" class="w-full p-3 text-white rounded-lg"
                                        style="background-color: #22c55e;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style>
.bar {
    height: 1px;
    /* Increased height for visibility */
    background-color: rgb(68, 66, 66);
    width: 100%;
    /* Added width to make it span horizontally */
    margin-top: 20px;
    margin-left: 0px;
    margin-right: 0px;
    padding: 0px;
}

.max-h-screen {
    max-height: 70vh;
    overflow-y: auto;
}

.max-h-screen::-webkit-scrollbar {
    width: 4px;
}


.max-h-screen::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

.max-h-screen::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.input-field {
    background-color: white;
    border: 1px solid #009EF733;
    padding: 10px;
    border-radius: 4px;
    color: #001b37;
    font-size: normal;
    font-weight: 300;
    transition: border-color 0.3s;
}

.input-field:focus {
    border-color: #009EF733;
    outline: none;
}
</style>
