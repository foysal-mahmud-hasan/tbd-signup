<script setup>
import axios from 'axios';
import 'primeicons/primeicons.css'
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { onMounted, ref, watch } from 'vue';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import ProgressSpinner from 'primevue/progressspinner';

const props = defineProps({
    showYoutubeModal: Boolean
})
const showSpinner = ref(false);
const disbaleSelect = ref(true)

onMounted(() => {
    businessModels();
    showSpinner.value = true
})
const toast = useToast();
const businessModelsData = ref(null)

const businessModels = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/poskeeper-apps`, {
            headers: {
                "X-API-KEY": "terminalbd",
                "X-API-VALUE": "terminalbd@aps"
            }
        });
        // console.log(response.data);
        businessModelsData.value = response.data;
        showSpinner.value = false;
        // console.log(businessModelsData.value)
    } catch (error) {
        console.log(error);
    }
}
const option = ref([])
watch(() => businessModelsData.value, (newValue) => {
    if (newValue && Array.isArray(newValue)) {
        option.value = newValue.map((item) => ({
            name: item.name,
            value: item.app_slug
        }));
        disbaleSelect.value = false
    }
    showSpinner.value = false
})
// Declare form and validation error objects as refs
const form = ref({
    app_slug: "",
    store_name: "",
    name: "",
    user_name: "",
    mobile: "",
    email: "",
    is_stock: 0,
    address: "",
    terms_condition: 0,
    password: ""
});

const validationErrors = ref({
    store_name: "",
    app_slug: "",
    mobile: "",
    terms_condition: "",
    name: "",
    user_name: "",
    password: ""
});

// Function to show warnings
const showWarn = (summary, detail) => {
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
        case 'app_slug':
            validationErrors.value.app_slug = !value ? "Business Model is required" : "";
            break;
        case 'store_name':
            validationErrors.value.store_name = !value.trim() ? "Company Name is required" : "";
            break;
        case 'terms_condition':
            validationErrors.value.terms_condition = !value ? "Must agree to termns & conditions" : "";
            break;
        case 'name':
            validationErrors.value.name = !value.trim()
                ? "Name is required" : "";
            break;
        case 'user_name':
            validationErrors.value.user_name = !value.trim()
                ? "User Name is required" : "";
            break;
        case 'password':
            validationErrors.value.password = !value.trim()
                ? "Password is required" : "";
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
watch(() => form.value.app_slug, (newValue) => validateField('app_slug', newValue));
watch(() => form.value.store_name, (newValue) => validateField('store_name', newValue));
watch(() => form.value.mobile, (newValue) => validateField('mobile', newValue));
watch(() => form.value.name, (newValue) => validateField('name', newValue));
watch(() => form.value.user_name, (newValue) => validateField('user_name', newValue));
watch(() => form.value.password, (newValue) => validateField('password', newValue));
watch(() => form.value.email, (newValue) => validateField('email', newValue)); watch(() => form.value.terms_condition, (newValue) => validateField('terms_condition', newValue));

const resetForm = () => {
    form.value.store_name = "";
    form.value.mobile = "";
    form.value.email = "";
    form.value.address = "";
    form.value.is_stock = 0;
    form.value.terms_condition = 0;
    form.value.name = "";
    form.value.user_name = "";
    form.value.password = ""
}
const submit = async () => {
    // Perform validation before submission
    Object.keys(form.value).forEach(key => {
        validateField(key, form.value[key]);
    });

    //validation check
    if (Object.values(validationErrors.value).some(error => error)) {
        if (Object.values(validationErrors.value).some(error => error !== "")) {
            showWarn('Validation Error', 'Please correct the errors before submitting.');
            return;
        }
    }
    showSpinner.value = true;
    const formData = {
        ...form.value,
        is_stock: form.value.is_stock ? 1 : 0,
        terms_condition: form.value.terms_condition ? 1 : 0
    };
    // console.log(formData)
    // Make an API request (Replace with actual URL)
    try {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/shop-api/flutter-api/poskeeper-shop-setup`,
            formData,  // request body
            {   // config object
                headers: {
                    "X-API-KEY": "terminalbd",
                    "X-API-VALUE": "terminalbd@aps"
                }
            }
        );
        showSpinner.value = false;
        // console.log(response.status);
        if (response.status === 200) {
            window.location.href = 'https://demo.poskeeper.com/'
        }
    } catch (error) {
        showSpinner.value = false;
        showWarn("Form Submission Error", error)
    }
};

</script>

<template>
    <div v-if="showSpinner" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-60">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" fill="transparent" animationDuration=".5s"
            aria-label="Custom ProgressSpinner" />
    </div>
    <Toast group="br" position="bottom-right" />
    <div class="min-h-screen max-h-screen w-full flex flex-col sm:justify-center items-center bg-[#F0F0F0]">
        <form @submit.prevent="submit">
            <div class="flex flex-col">
                <!-- Fixed Header -->
                <div class="flex-1 mt-1 shadow-md rounded-lg bg-white">
                    <div class="flex flex-col sm:justify-start justify-center">
                        <div class="flex flex-col items-center mb-4">
                            <h2 class="text-3xl mt-2 font-semibold text-[#4a4b68] text-center">Welcome to Pos Keeper
                            </h2>
                            <h2 class="text-2xl mt-2 font-semibold text-[green] text-center">Create Your online store
                            </h2>
                        </div>
                        <div class="bar"></div>
                    </div>
                </div>

                <!-- Scrollable Content -->
                <div class="flex-1 mt-1 shadow-md rounded-lg bg-white max-h-screen"
                    style="max-height: calc(100vh - 186px);">
                    <div class="flex flex-col sm:justify-start justify-center">
                        <div class="w-full px-6 py-0">
                            <div class="p-4">
                                <div class="mt-1 flex-1">
                                    <label class="text-sm text-[#4a4b68]">Business Model <span
                                            style="color: red;">*</span></label>
                                    <Select :disabled="disbaleSelect" v-model="form.app_slug" :options="option"
                                        optionValue="value" optionLabel="name" placeholder="Select Business type"
                                        class="w-full" />
                                    <small v-if="validationErrors.app_slug" class="text-xs text-red-600 block">
                                        {{ validationErrors.app_slug }}
                                    </small>
                                </div>
                                <div class="mt-4 flex-1">
                                    <label class="text-sm text-[#4a4b68]">Company/Shop name <span
                                            style="color: red;">*</span></label>
                                    <InputText v-model="form.store_name" class="w-full p-2 input-field"
                                        placeholder="XYZ Company" />
                                    <small v-if="validationErrors.store_name" class="text-xs text-red-600 block">
                                        {{ validationErrors.store_name }}
                                    </small>
                                </div>
                                <div class="mt-4 flex-1">
                                    <label class="text-sm text-[#4a4b68]">Mobile <span
                                            style="color: red;">*</span></label>
                                    <InputText v-model="form.mobile" class="w-full p-2 input-field"
                                        placeholder="+880" />
                                    <small v-if="validationErrors.mobile" class="text-xs text-red-600 block">
                                        {{ validationErrors.mobile }}
                                    </small>
                                </div>
                                <div class="mt-4 flex-1">
                                    <label class="text-sm text-[#4a4b68]">Email</label>
                                    <InputText type="email" v-model="form.email" class="w-full p-2 input-field"
                                        placeholder="xyz@xyz.com" />
                                    <small v-if="validationErrors.email" class="text-xs text-red-600 block">
                                        {{ validationErrors.email }}
                                    </small>
                                </div>
                                <div class="mt-4">
                                    <label class="text-sm text-[#4a4b68]">Address </label>
                                    <Textarea v-model="form.address" rows="3" cols="30" class="w-full p-2 input-field"
                                        autoResize />
                                </div>
                                <div class="mt-4">
                                    <label class="flex items-center space-x-2 mt-2 md:mt-0">
                                        <input v-model="form.is_stock" type="checkbox"
                                            class="w-6 h-6 border border-gray-400 rounded focus:ring-0 accent-green-500 text-green-500" />
                                        <span>Are you interested in ready stock?</span>
                                    </label>
                                </div>
                                <div class="mt-4">
                                    <label class="flex items-center space-x-2 mt-2 md:mt-0">
                                        <input v-model="form.terms_condition" type="checkbox"
                                            class="w-6 h-6 border border-gray-400 rounded focus:ring-0 accent-green-500 text-green-500" />
                                        <span>I Accept terms and conditions</span>
                                    </label>
                                    <small v-if="validationErrors.password" class="block text-xs text-red-600 mt-1">
                                        {{ validationErrors.terms_condition }}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 mt-1 shadow-md rounded-lg bg-white">
                        <div class="flex flex-col sm:justify-start justify-center">
                            <div class="flex flex-col items-center mb-4">
                                <h2 class="text-2xl mt-4 font-semibold text-[green] text-center">Login Information</h2>
                            </div>
                            <div class="bar"></div>
                            <div class="w-full px-6 py-0">
                                <div class="p-4">
                                    <div class="mt-2 flex-1">
                                        <label class="text-sm text-[#4a4b68]">Name <span
                                                style="color: red;">*</span></label>
                                        <InputText v-model="form.name" class="w-full p-2 input-field"
                                            placeholder="Name" />
                                        <small v-if="validationErrors.name" class="text-xs text-red-600 block">
                                            {{ validationErrors.name }}
                                        </small>
                                    </div>
                                    <div class="mt-4 flex-1">
                                        <label class="text-sm text-[#4a4b68]">Username <span
                                                style="color: red;">*</span></label>
                                        <InputText v-model="form.user_name" class="w-full p-2 input-field"
                                            placeholder="Username" />
                                        <small v-if="validationErrors.user_name" class="text-xs text-red-600 block">
                                            {{ validationErrors.user_name }}
                                        </small>
                                    </div>
                                    <div class="mt-4 flex-1">
                                        <label class="text-sm text-[#4a4b68]">Password <span
                                                style="color: red;">*</span></label>
                                        <InputText v-model="form.password" class="w-full p-2 input-field"
                                            placeholder="Username" />
                                        <small v-if="validationErrors.password" class="block text-xs text-red-600">
                                            {{ validationErrors.password }}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fixed Footer -->
                <div class="flex-1 mt-1 shadow-md rounded-lg bg-white">
                    <div class="p-4">
                        <div class="flex items-center justify-center w-full sm:w-auto mb-1">
                            <Button type="submit" label="Build Store" class="w-full p-3 text-white rounded-lg"
                                style="background-color: #22c55e;" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<style>
.bar {
    height: 1px;
    /* Increased height for visibility */
    background-color: #00994f;
    width: 100%;
    /* Added width to make it span horizontally */
    margin-top: 6px;
    margin-left: 0px;
    margin-right: 0px;
    padding: 0px;
}

.max-h-screen {
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
