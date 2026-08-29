




document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const preview = document.getElementById("cvPreview");

    const photoInput =
        document.getElementById("photoInput");

    const previewPhoto =
        document.getElementById("previewPhoto");

    const photoPlaceholder =
        document.getElementById("photoPlaceholder");

    const removePhoto =
        document.getElementById("removePhoto");


    /* =====================================================
       LIVE TEXT CONNECTIONS
    ===================================================== */

    const fields = [

        {
            input: "nameInput",
            output: "previewName",
            fallback: "Your Name"
        },

        {
            input: "titleInput",
            output: "previewTitle",
            fallback: "Professional Title"
        },

        {
            input: "emailInput",
            output: "previewEmail",
            fallback: "your@email.com"
        },

        {
            input: "phoneInput",
            output: "previewPhone",
            fallback: "+92 300 0000000"
        },

        {
            input: "locationInput",
            output: "previewLocation",
            fallback: "Pakistan"
        },

        {
            input: "summaryInput",
            output: "previewSummary",
            fallback: "Your professional summary will appear here. Add a short introduction about yourself."
        },

        {
            input: "jobInput",
            output: "previewJob",
            fallback: "Job Title"
        },

        {
            input: "datesInput",
            output: "previewDates",
            fallback: "2024 — Present"
        },

        {
            input: "companyInput",
            output: "previewCompany",
            fallback: "Company Name"
        },

        {
            input: "experienceInput",
            output: "previewExperience",
            fallback: "Your experience description will appear here."
        },

        {
            input: "degreeInput",
            output: "previewDegree",
            fallback: "Bachelor's Degree"
        },

        {
            input: "institutionInput",
            output: "previewInstitution",
            fallback: "University Name"
        },

{
    input: "objectiveInput",
    output: "previewObjective",
    fallback: "Your career objective will appear here."
},

{
    input: "certificatesInput",
    output: "previewCertificates",
    fallback: "Certificate Name — Issuing Organization"
},

{
    input: "interestsInput",
    output: "previewInterests",
    fallback: "Technology · Reading · Design"
}

    ];


    /* =====================================================
       CONNECT INPUT → LIVE PREVIEW
    ===================================================== */

    fields.forEach(field => {

        const input =
            document.getElementById(field.input);

        const output =
            document.getElementById(field.output);

        if (!input || !output) return;


        input.addEventListener("input", () => {

            const value =
                input.value.trim();

            output.textContent =
                value || field.fallback;

        });

    });


    /* =====================================================
       EDUCATION DATES
    ===================================================== */

    const startYear =
        document.getElementById("startYearInput");

    const endYear =
        document.getElementById("endYearInput");

    const educationDates =
        document.getElementById("previewEducationDates");


    function updateEducationDates() {

        const start =
            startYear.value.trim() || "2022";

        const end =
            endYear.value.trim() || "2026";

        educationDates.textContent =
            `${start} — ${end}`;
    }


    startYear.addEventListener(
        "input",
        updateEducationDates
    );

    endYear.addEventListener(
        "input",
        updateEducationDates
    );




























    /* =====================================================
       SKILLS
    ===================================================== */

    const skillsInput =
        document.getElementById("skillsInput");

    const skillsOutput =
        document.getElementById("previewSkills");


    skillsInput.addEventListener("input", () => {

        const skills =
            skillsInput.value
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean);


        skillsOutput.textContent =
            skills.length
                ? skills.join(" · ")
                : "JavaScript · React · HTML · CSS";

    });


    /* =====================================================
       LANGUAGES
    ===================================================== */

    const languagesInput =
        document.getElementById("languagesInput");

    const languagesOutput =
        document.getElementById("previewLanguages");


    languagesInput.addEventListener("input", () => {

        const languages =
            languagesInput.value
                .split(",")
                .map(language => language.trim())
                .filter(Boolean);


        languagesOutput.textContent =
            languages.length
                ? languages.join(" · ")
                : "English · Urdu";

    });


    /* =====================================================
       PHOTO UPLOAD
    ===================================================== */

    photoInput.addEventListener("change", () => {

        const file =
            photoInput.files[0];

        if (!file) return;


        if (!file.type.startsWith("image/")) {

            alert("Please select a JPG or PNG image.");

            photoInput.value = "";

            return;
        }


        const reader =
            new FileReader();


        reader.onload = event => {

            previewPhoto.src =
                event.target.result;

            previewPhoto.style.display =
                "block";

            photoPlaceholder.style.display =
                "none";

        };


        reader.readAsDataURL(file);

    });


    /* =====================================================
       REMOVE PHOTO
    ===================================================== */

    removePhoto.addEventListener("click", () => {

        photoInput.value = "";

        previewPhoto.src = "";

        previewPhoto.style.display =
            "none";

        photoPlaceholder.style.display =
            "flex";

    });


    /* =====================================================
       TEMPLATE SWITCHING
    ===================================================== */

    const templateButtons =
        document.querySelectorAll(
            ".template-option"
        );


    templateButtons.forEach(button => {

        button.addEventListener("click", () => {


            /* Remove active */

            templateButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            /* Activate clicked */

            button.classList.add("active");


            /* Get template */

            const template =
                button.dataset.template;


            /* Change REAL CV */

            preview.className =
                `cv-paper ${template}`;


            console.log(
                "Selected template:",
                template
            );

        });

    });


    /* =====================================================
       DOWNLOAD
    ===================================================== */
/* =====================================================
   DOWNLOAD PDF — MOBILE + DESKTOP
===================================================== */

/* =====================================================
   DOWNLOAD PDF — ROBUST MOBILE + DESKTOP VERSION
===================================================== */

document
    .getElementById("downloadButton")
    .addEventListener("click", async () => {

        const button =
            document.getElementById("downloadButton");

        const originalCV =
            document.getElementById("cvPreview");


        if (!originalCV) {

            alert("CV preview could not be found.");

            return;
        }


        button.textContent = "Creating PDF...";
        button.disabled = true;


        let exportCV = null;


        try {

            /* -----------------------------------------
               1. Wait for browser rendering
            ----------------------------------------- */

            await new Promise(resolve =>
                requestAnimationFrame(() => resolve())
            );

            await new Promise(resolve =>
                setTimeout(resolve, 300)
            );


            /* -----------------------------------------
               2. Wait for fonts
            ----------------------------------------- */

            if (document.fonts &&
                document.fonts.ready) {

                await document.fonts.ready;

            }


            /* -----------------------------------------
               3. Create a fixed A4 export copy
            ----------------------------------------- */

            exportCV =
                originalCV.cloneNode(true);


            exportCV.id =
                "cvPdfExport";


            exportCV.style.position =
                "fixed";

            exportCV.style.left =
                "-10000px";

            exportCV.style.top =
                "0";

            exportCV.style.width =
                "794px";

            exportCV.style.minWidth =
                "794px";

            exportCV.style.maxWidth =
                "794px";

            exportCV.style.height =
                "1123px";

            exportCV.style.minHeight =
                "1123px";

            exportCV.style.maxHeight =
                "1123px";

            exportCV.style.margin =
                "0";

            exportCV.style.transform =
                "none";

            exportCV.style.zoom =
                "1";

            exportCV.style.display =
                "block";

            exportCV.style.visibility =
                "visible";

            exportCV.style.opacity =
                "1";

            exportCV.style.background =
                "#ffffff";


            document.body.appendChild(exportCV);


            /* -----------------------------------------
               4. Wait for images in export copy
            ----------------------------------------- */

            const images =
                exportCV.querySelectorAll("img");


            await Promise.all(

                Array.from(images).map(img => {

                    if (img.complete &&
                        img.naturalWidth > 0) {

                        return Promise.resolve();

                    }


                    return new Promise(resolve => {

                        const done = () => {

                            img.removeEventListener(
                                "load",
                                done
                            );

                            img.removeEventListener(
                                "error",
                                done
                            );

                            resolve();

                        };


                        img.addEventListener(
                            "load",
                            done
                        );

                        img.addEventListener(
                            "error",
                            done
                        );


                        setTimeout(
                            done,
                            5000
                        );

                    });

                })

            );


            /* -----------------------------------------
               5. Give layout one final moment
            ----------------------------------------- */

            await new Promise(resolve =>
                setTimeout(resolve, 200)
            );


            /* -----------------------------------------
               6. Capture fixed A4 CV
            ----------------------------------------- */

            const canvas =
                await html2canvas(
                    exportCV,
                    {

                        scale: Math.min(
                            window.devicePixelRatio || 1,
                            2
                        ),

                        width: 794,

                        height: 1123,

                        windowWidth: 794,

                        windowHeight: 1123,

                        backgroundColor:
                            "#ffffff",

                        useCORS: true,

                        allowTaint: true,

                        logging: false,

                        imageTimeout: 15000,

                        scrollX: 0,

                        scrollY: 0

                    }
                );


            /* -----------------------------------------
               7. Make sure canvas is actually populated
            ----------------------------------------- */

            if (
                !canvas ||
                canvas.width === 0 ||
                canvas.height === 0
            ) {

                throw new Error(
                    "CV canvas was empty."
                );

            }


            /* -----------------------------------------
               8. Create real A4 PDF
            ----------------------------------------- */

            const {
                jsPDF
            } = window.jspdf;


            if (!jsPDF) {

                throw new Error(
                    "jsPDF library was not found."
                );

            }


            const pdf =
                new jsPDF({

                    orientation: "portrait",

                    unit: "mm",

                    format: "a4",

                    compress: true

                });


            const imageData =
                canvas.toDataURL(
                    "image/jpeg",
                    0.95
                );


            pdf.addImage(
                imageData,
                "JPEG",
                0,
                0,
                210,
                297,
                undefined,
                "FAST"
            );


            /* -----------------------------------------
               9. Download
            ----------------------------------------- */

            pdf.save("my-cv.pdf");


        } catch (error) {

            console.error(
                "PDF generation error:",
                error
            );


            alert(
                "Sorry, the PDF could not be created. Please try again."
            );


        } finally {


            /* -----------------------------------------
               10. Remove temporary export copy
            ----------------------------------------- */

            if (exportCV) {

                exportCV.remove();

            }


            button.textContent =
                "Download PDF";

            button.disabled =
                false;

        }

    });
      });
