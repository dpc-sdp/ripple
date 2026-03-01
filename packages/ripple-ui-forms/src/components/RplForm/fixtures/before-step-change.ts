import type { StepChangeData } from '@formkit/addons'

export const handleEligibilityStepChange = async ({
  currentStep,
  targetStep,
  delta
}: StepChangeData) => {
  console.log('beforeStepChange', { currentStep, targetStep, delta })

  const parentBeforeStepChange =
    currentStep.node.parent?.props?.beforeStepChange

  if (typeof parentBeforeStepChange === 'function') {
    const isParentAllowed = await parentBeforeStepChange({
      currentStep,
      targetStep,
      delta
    })

    if (!isParentAllowed) {
      return false
    }
  }

  if (delta > 0 && !currentStep.isValid) {
    return false
  }

  // Delta < 0 indicates navigating backwards.
  // We want to allow users to navigate back to the eligibility step, but prevent navigating back to the branch steps once they've moved past them.
  if (delta < 0) {
    const branchSteps = ['eligible', 'not-eligible']
    const isCurrentBranchStep = branchSteps.includes(currentStep.node.name)
    const isTargetBranchStep = branchSteps.includes(targetStep.node.name)

    // Allow branch step -> eligibility directly (no interception).
    if (isCurrentBranchStep && targetStep.node.name === 'eligibility') {
      return true
    }

    // Prevent navigating backwards between branch steps.
    if (isCurrentBranchStep && isTargetBranchStep) {
      currentStep.node.parent?.goTo('eligibility')
      return false
    }

    // Prevent review from going back to a branch step directly.
    if (currentStep.node.name === 'review' && isTargetBranchStep) {
      currentStep.node.parent?.goTo('eligibility')
      return false
    }

    return true
  }

  if (currentStep.node.name === 'eligibility') {
    const organization =
      currentStep.value?.address?.organization ??
      currentStep.value?.address?.orginisation

    const desiredStep = organization === 'test' ? 'eligible' : 'not-eligible'

    if (desiredStep !== targetStep.node.name) {
      currentStep.node.parent?.goTo(desiredStep)
      return false
    }
  }

  if (currentStep.node.name === 'eligible') {
    return true
  }

  if (currentStep.node.name === 'not-eligible') {
    currentStep.node.parent?.goTo('eligibility')
    return false
  }

  return true
}
