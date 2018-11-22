//lesson 1
const fireballSize = 22;
const wizardSpeed = 3;
const wizardWidth = 70;

function getFireballSpeed(left) {
    return left ? 5 : 2;
}

function getWizardHeight(wizardWidth) {
    return 1.337 * wizardWidth;
}

function getWizardX(width) {
    return width / 2;
}

function getWizardY(height) {
    return height * 2 / 3;
}
//lesson 2
