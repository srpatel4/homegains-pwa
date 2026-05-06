const workoutData = {
    push: {
        id: "push",
        title: "Push Day",
        desc: "Chest, Shoulders & Triceps",
        color: "var(--accent-push)",
        exercises: [
            {
                name: "Decline Push-ups",
                sets: "3-4",
                reps: "8-12",
                tips: "Elevate your feet on a couch, chair, or bed. Keep your core tight and focus on feeling the stretch in your upper chest."
            },
            {
                name: "Standard Push-ups",
                sets: "3",
                reps: "10-15",
                tips: "Keep your elbows tucked in at a 45-degree angle. Lower yourself slow and controlled, then explode up."
            },
            {
                name: "Pike Push-ups",
                sets: "3",
                reps: "8-12",
                tips: "Get into a V-shape with hips high in the air. Lower your head towards the floor in front of your hands to target the shoulders."
            },
            {
                name: "Chair Dips",
                sets: "3",
                reps: "10-15",
                tips: "Use a sturdy chair or the edge of a bed. Keep your back close to the edge and lower until arms are at 90 degrees."
            },
            {
                name: "Diamond Push-ups",
                sets: "3",
                reps: "AMRAP",
                tips: "Form a diamond with your hands under your chest. This puts maximum emphasis on your triceps to finish the workout. (As Many Reps As Possible)"
            }
        ]
    },
    pull: {
        id: "pull",
        title: "Pull Day",
        desc: "Back, Biceps & Rear Delts",
        color: "var(--accent-pull)",
        exercises: [
            {
                name: "Back Widows",
                sets: "4",
                reps: "12-15",
                tips: "Lie on your back with knees bent. Drive your elbows into the floor to lift your upper body. Squeeze your shoulder blades hard."
            },
            {
                name: "Superman Pulls",
                sets: "3",
                reps: "15",
                tips: "Lie on your stomach. Lift chest and legs slightly. Extend arms forward, then pull elbows back simulating a pull-up, squeezing lats."
            },
            {
                name: "Sliding Floor Pulldowns",
                sets: "3",
                reps: "10-12",
                tips: "Lie on a smooth floor (wear socks or use a towel under hands). Pull your body forward using your lats, then slide back."
            },
            {
                name: "Reverse Snow Angels",
                sets: "3",
                reps: "15",
                tips: "Lie face down, arms by your sides. Keeping arms straight, sweep them up over your head, then back down. Targets upper back and rear delts."
            },
            {
                name: "Leg-Resisted Bicep Curls",
                sets: "3",
                reps: "12/arm",
                tips: "Sit down, loop a towel under one thigh. Grab ends of towel and curl your arm up while actively pushing down with your leg for resistance."
            }
        ]
    },
    legs: {
        id: "legs",
        title: "Leg Day",
        desc: "Quads, Hamstrings, Glutes & Calves",
        color: "var(--accent-legs)",
        exercises: [
            {
                name: "Bulgarian Split Squats",
                sets: "4",
                reps: "10-12/leg",
                tips: "Place rear foot up on a couch or chair. Drop back knee towards the floor. Keep torso upright for quads, lean forward for glutes."
            },
            {
                name: "Bodyweight Squats",
                sets: "3",
                reps: "20-25",
                tips: "Feet shoulder-width apart. Go as deep as comfortable while keeping heels on the floor. Maintain a steady, rhythmic pace."
            },
            {
                name: "Glute Bridges",
                sets: "3",
                reps: "15",
                tips: "Lie on back, knees bent, feet flat. Drive through heels to lift hips. Squeeze glutes hard at the top for 2 seconds."
            },
            {
                name: "Walking Lunges",
                sets: "3",
                reps: "20 steps",
                tips: "Take long steps. Gently tap the back knee to the floor. Focus on stability and driving off the front heel."
            },
            {
                name: "Single-Leg Calf Raises",
                sets: "4",
                reps: "15-20/leg",
                tips: "Stand on the edge of a thick book or stair. Lower heel for a deep stretch, then explode up onto your toes."
            }
        ]
    }
};

function renderWorkout(dayId) {
    const container = document.getElementById('workout-container');
    const data = workoutData[dayId];
    
    // Load saved checklist state for this day
    const savedState = JSON.parse(localStorage.getItem(`workout_state_${dayId}`) || '{}');

    // Create HTML string
    let html = `
        <section id="${data.id}" class="workout-section active-section" style="--card-accent: ${data.color}">
            <div class="section-header">
                <h2 class="section-title" style="color: ${data.color}">${data.title}</h2>
                <p class="section-desc">${data.desc}</p>
                <button id="reset-checklist" class="reset-btn">Reset Checklist</button>
            </div>
            <div class="exercises-grid">
    `;

    data.exercises.forEach((ex, index) => {
        const isChecked = savedState[index] ? 'checked' : '';
        const cardClass = savedState[index] ? 'exercise-card completed' : 'exercise-card';

        html += `
            <div class="${cardClass}" data-index="${index}" style="animation: staggerFadeIn 0.5s ease both; animation-delay: ${index * 0.1}s;">
                <div class="card-header">
                    <h3 class="ex-name">${ex.name}</h3>
                    <label class="custom-checkbox">
                        <input type="checkbox" class="ex-checkbox" ${isChecked}>
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="ex-number">0${index + 1}</div>
                <div class="ex-metrics">
                    <div class="metric">
                        <span class="metric-label">Sets</span>
                        ${ex.sets}
                    </div>
                    <div class="metric">
                        <span class="metric-label">Reps</span>
                        ${ex.reps}
                    </div>
                </div>
                <p class="ex-tips">${ex.tips}</p>
            </div>
        `;
    });

    html += `
            </div>
        </section>
    `;

    // Inject and trigger animation
    container.innerHTML = html;

    if (typeof setupTiltEffects === 'function') setupTiltEffects();
    if (typeof updateProgress === 'function') updateProgress(dayId);

    // Add event listeners for checkboxes
    document.querySelectorAll('.ex-checkbox').forEach(box => {
        box.addEventListener('change', (e) => {
            const card = e.target.closest('.exercise-card');
            const index = card.getAttribute('data-index');
            
            if (e.target.checked) {
                card.classList.add('completed');
            } else {
                card.classList.remove('completed');
            }

            // Save to local storage
            const currentState = JSON.parse(localStorage.getItem(`workout_state_${dayId}`) || '{}');
            currentState[index] = e.target.checked;
            localStorage.setItem(`workout_state_${dayId}`, JSON.stringify(currentState));
            
            if (typeof updateProgress === 'function') updateProgress(dayId);
        });
    });

    // Reset button listener
    document.getElementById('reset-checklist').addEventListener('click', () => {
        localStorage.removeItem(`workout_state_${dayId}`);
        renderWorkout(dayId);
    });
}

// Event Listeners for Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from all
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        const clickedBtn = e.currentTarget;
        clickedBtn.classList.add('active');
        
        // Render new content
        const target = clickedBtn.getAttribute('data-target');
        renderWorkout(target);
    });
});

function updateProgress(dayId) {
    const savedState = JSON.parse(localStorage.getItem(`workout_state_${dayId}`) || '{}');
    const total = workoutData[dayId].exercises.length;
    let completed = 0;
    for (let i = 0; i < total; i++) {
        if (savedState[i]) completed++;
    }
    const percent = total > 0 ? (completed / total) * 100 : 0;
    const progressBar = document.getElementById('workout-progress');
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
        progressBar.style.backgroundColor = workoutData[dayId].color;
        progressBar.style.boxShadow = `0 0 15px ${workoutData[dayId].color}`;
    }
}

function setupTiltEffects() {
    document.querySelectorAll('.exercise-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) skewX(-5deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.zIndex = 10;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) skewX(-5deg) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.zIndex = 1;
        });
    });
}

// Initial Render
renderWorkout('push');

// Floating Timer Logic
let timerInterval;
let timeLeft = 60;
let isRunning = false;

const timerDisplay = document.querySelector('.timer-display');
const btnStart = document.getElementById('timer-start');
const btnReset = document.getElementById('timer-reset');
const btn60 = document.getElementById('timer-preset-60');
const btn90 = document.getElementById('timer-preset-90');

function updateDisplay() {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${m}:${s}`;
}

function startTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        btnStart.textContent = '▶';
    } else {
        if (timeLeft === 0) timeLeft = 60;
        isRunning = true;
        btnStart.textContent = '⏸';
        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                btnStart.textContent = '▶';
                // Play notification flash
                timerDisplay.style.color = 'var(--accent-push)';
                setTimeout(() => timerDisplay.style.color = '', 500);
                setTimeout(() => timerDisplay.style.color = 'var(--accent-push)', 1000);
                setTimeout(() => timerDisplay.style.color = '', 1500);
            }
        }, 1000);
    }
}

function setPreset(seconds) {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = seconds;
    btnStart.textContent = '▶';
    timerDisplay.style.color = '';
    updateDisplay();
}

btnStart.addEventListener('click', startTimer);
btnReset.addEventListener('click', () => setPreset(60));
btn60.addEventListener('click', () => setPreset(60));
btn90.addEventListener('click', () => setPreset(90));

updateDisplay();



// Parallax Background
const bgContainer = document.querySelector('.background-elements');
document.addEventListener('mousemove', (e) => {
    if (!bgContainer) return;
    const x = (e.clientX / window.innerWidth - 0.5) * -40; 
    const y = (e.clientY / window.innerHeight - 0.5) * -40;
    bgContainer.style.transform = `translate(${x}px, ${y}px)`;
});
