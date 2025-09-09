#!/bin/bash
cd /home/kavia/workspace/code-generation/pastel-outfit-marketplace-131687-131697/ecommerce_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

