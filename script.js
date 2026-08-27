document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const proceduresData = {
        automotor: [
            {
                name: "Transferencia Automotor",
                requirements: [
                    "DNI del comprador y vendedor.",
                    "Título del vehículo y Cédula Verde/Azul.",
                    "Formulario 08 (firmado y certificado).",
                    "Constancia de CUIT/CUIL.",
                    "Verificación policial (Planta verificadora).",
                    "CETA de AFIP (si el valor supera el monto mínimo)."
                ]
            },
            {
                name: "Informe de Dominio / Histórico",
                requirements: [
                    "Número de patente (dominio).",
                    "DNI del solicitante.",
                    "Pago de aranceles registrales."
                ]
            },
            {
                name: "Reducción y Levantamiento de Multas",
                requirements: [
                    "DNI del titular.",
                    "Informe de infracciones actualizado.",
                    "Documentación que acredite pago u error si corresponde."
                ]
            }
        ],
        inmuebles_caba: [
            {
                name: "Certificados de Inhibiciones",
                requirements: ["Nombre completo y DNI/CUIT del consultado.", "Pago de arancel registral."]
            },
            {
                name: "Certificados de Dominio",
                requirements: ["Número de matrícula/inscripción.", "Dirección del inmueble.", "Datos del titular."]
            },
            {
                name: "Inscripciones y levantamiento de Embargos e Inhibiciones",
                requirements: ["Oficio judicial firmado por juez o secretario.", "Copia del auto que lo ordena.", "Minuta de inscripción."]
            },
            {
                name: "Inscripciones Declaratorias, Disoluciones Conyugales, Cesiones, Adjudicaciones, etc.",
                requirements: ["Oficio y testimonio sellado.", "Documentación del expediente judicial.", "Datos completos de los inmuebles afectados."]
            }
        ],
        inmuebles_pba: [
            {
                name: "Informe de Dominio",
                requirements: ["Partido y partida del inmueble.", "Titular de dominio.", "N° de Matrícula o Folio/Año."]
            },
            {
                name: "Informe de Inhibición",
                requirements: ["Apellido, nombre y DNI del consultado.", "CUIT/CUIL si corresponde."]
            },
            {
                name: "Informe de Cesión",
                requirements: ["Datos de la persona que cede acciones o derechos.", "Nombre completo y DNI."]
            },
            {
                name: "Asiento Registral",
                requirements: ["Datos catastrales.", "Identificación de la unidad funcional si corresponde."]
            },
            {
                name: "Frecuencia",
                requirements: ["Datos identificatorios del inmueble."]
            },
            {
                name: "Certificados de Catastro",
                requirements: ["Estado parcelario vigente.", "Cédula catastral."]
            },
            {
                name: "Oficios Varios",
                requirements: ["Solicitud judicial o administrativa pertinente."]
            },
            {
                name: "Fotocopias de Minutas y/o protocolos",
                requirements: ["Referencia de la inscripción original.", "Justificación del pedido."]
            },
            {
                name: "Inscripciones y levantamiento de Embargos e Inhibiciones – Ley 22.172",
                requirements: ["Oficio judicial original de extraña jurisdicción diligenciado.", "Sello de justicia correspondiente."]
            },
            {
                name: "Inscripciones Declaratorias, Disoluciones Conyugales, Cesiones, Adjudicaciones Ley 22.172, Bien de Familia",
                requirements: ["Testimonio original con sello Ley 22.172.", "Acreditación de pago de tasa si aplica."]
            },
            {
                name: "Obtención Segundo testimonio (En forma judicial)",
                requirements: ["Orden judicial.", "Publicación de edictos si el juez lo requiere.", "Minutas para inscripción."]
            }
        ],
        registro: [
            {
                name: "Partidas (Nacimiento, Matrimonio, Defunción)",
                requirements: [
                    "Nombre y apellido del inscrito.",
                    "Fecha aproximada del evento.",
                    "Lugar de inscripción (Localidad/Ciudad).",
                    "Datos de los padres (para partidas de nacimiento)."
                ]
            }
        ],
        nautica: [
            {
                name: "Matriculación / Transferencia Náutica",
                requirements: [
                    "Factura de compra o boleto de compra-venta.",
                    "Certificado de construcción.",
                    "DNI del titular.",
                    "Aprobación de PNA (Prefectura Naval Argentina)."
                ]
            }
        ],
        varios: [
            {
                name: "Trámites Varios (ANSES, ARCA, ARBA y otros)",
                requirements: [
                    "Consultanos detalladamente sobre tu trámite.",
                    "La documentación depende del organismo y tipo de gestión."
                ]
            }
        ]
    };

    // --- DOM Elements ---
    const modals = { tramites: document.getElementById('modalTramites') };

    const buttons = {
        openTramites: document.getElementById('openTramites'),
        closeModals: document.querySelectorAll('.close-modal')
    };

    const containerProcedures = document.getElementById('proceduresList');
    const serviceCards = document.querySelectorAll('.service-card');

    // --- Modal Logic ---
    function openModal(modalId) {
        modals[modalId].classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        Object.values(modals).forEach(m => m.classList.remove('active'));
        document.body.style.overflow = 'auto';
    }

    buttons.openTramites.addEventListener('click', () => {
        showProcedures('automotor'); // Default or all
        openModal('tramites');
    });

    buttons.closeModals.forEach(btn => btn.addEventListener('click', closeModal));

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) closeModal();
    });

    // --- Procedures Injection ---
    function showProcedures(category) {
        containerProcedures.innerHTML = '';
        const items = proceduresData[category] || [];

        items.forEach((proc, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'procedure-item';
            itemDiv.innerHTML = `
                <span>${proc.name}</span>
                <i class="fas fa-chevron-right"></i>
            `;

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'procedure-details';
            detailsDiv.innerHTML = `
                <h4 style="color: var(--secondary); margin-bottom: 15px;">Lo que necesitas:</h4>
                <ul style="list-style: none; padding-left: 0;">
                    ${proc.requirements.map(req => `<li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: #2ecc71; margin-right: 10px;"></i> ${req}</li>`).join('')}
                </ul>
            `;

            itemDiv.addEventListener('click', () => {
                const isOpen = detailsDiv.style.display === 'block';
                // Close others if open (optional)
                document.querySelectorAll('.procedure-details').forEach(d => d.style.display = 'none');
                document.querySelectorAll('.procedure-item i').forEach(i => {
                    i.classList.remove('fa-chevron-down');
                    i.classList.add('fa-chevron-right');
                });

                if (!isOpen) {
                    detailsDiv.style.display = 'block';
                    itemDiv.querySelector('i').classList.remove('fa-chevron-right');
                    itemDiv.querySelector('i').classList.add('fa-chevron-down');
                }
            });

            containerProcedures.appendChild(itemDiv);
            containerProcedures.appendChild(detailsDiv);
        });
    }

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            showProcedures(cat);
            openModal('tramites');
        });
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Smooth Scrolling & Sticky Header ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(12, 45, 87, 0.95)';
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });

    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

