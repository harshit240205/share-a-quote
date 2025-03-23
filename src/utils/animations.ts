
// Animation utilities for the quote application

// Subtle entrance animation sequence
export const entranceAnimation = (element: HTMLElement, delay: number = 0) => {
  if (!element) return;
  
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    element.style.transition = 'opacity 800ms ease, transform 800ms ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, delay);
};

// Sequence multiple elements with a staggered delay
export const staggeredEntrance = (elements: HTMLElement[], baseDelay: number = 0, staggerDelay: number = 100) => {
  elements.forEach((element, index) => {
    entranceAnimation(element, baseDelay + (index * staggerDelay));
  });
};

// Button press effect
export const buttonPressEffect = (element: HTMLElement) => {
  if (!element) return;
  
  element.style.transition = 'transform 200ms ease';
  element.style.transform = 'scale(0.97)';
  
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 200);
};

// Swap animation for quote changes
export const quoteSwapAnimation = (
  oldElement: HTMLElement, 
  newElement: HTMLElement, 
  direction: 'next' | 'prev' = 'next'
) => {
  if (!oldElement || !newElement) return;
  
  // Prepare elements
  const container = oldElement.parentElement;
  if (!container) return;
  
  newElement.style.position = 'absolute';
  newElement.style.top = '0';
  newElement.style.left = '0';
  newElement.style.width = '100%';
  newElement.style.opacity = '0';
  newElement.style.transform = direction === 'next' ? 'translateY(20px)' : 'translateY(-20px)';
  
  // Add new element to container
  container.style.position = 'relative';
  container.appendChild(newElement);
  
  // Animate old element out
  oldElement.style.transition = 'opacity 300ms ease, transform 300ms ease';
  oldElement.style.opacity = '0';
  oldElement.style.transform = direction === 'next' ? 'translateY(-20px)' : 'translateY(20px)';
  
  // Animate new element in
  setTimeout(() => {
    newElement.style.transition = 'opacity 600ms ease, transform 600ms ease';
    newElement.style.opacity = '1';
    newElement.style.transform = 'translateY(0)';
  }, 300);
  
  // Clean up
  setTimeout(() => {
    oldElement.remove();
    newElement.style.position = 'static';
  }, 900);
};

// Button hover effect for subtle interaction
export const buttonHoverEffect = (element: HTMLElement) => {
  if (!element) return;
  
  element.addEventListener('mouseenter', () => {
    element.style.transition = 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)';
    element.style.transform = 'translateY(-2px)';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transition = 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)';
    element.style.transform = 'translateY(0)';
  });
};
