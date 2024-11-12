import ReactDOM from "react-dom";
import Header from "../Header";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null; // case: Don't render anything if the modal is closed

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-dark-secondary">
        <Header
          name={name}
          buttonComponent={
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary text-white hover:bg-blue-600"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;

/*
`ReactDOM.createPortal` is used in React to render a component's children into a DOM node that exists outside the hierarchy of the parent component. This is particularly useful for modals, tooltips, and overlays where you want to break out of the normal flow of the DOM.

### Use Cases:
1. **Modals**: When you want to display a modal dialog that overlays other content, using a portal allows the modal to be rendered outside of its parent component, preventing CSS issues like overflow or z-index conflicts.

2. **Tooltips**: Similar to modals, tooltips often need to be rendered in a different part of the DOM to avoid clipping by parent elements.

3. **Overlays**: For components that need to cover the entire screen or a specific area, portals allow you to manage their positioning more effectively.

4. **Global Notifications**: For notifications or alerts that should appear at a fixed position on the screen, portals can help manage their placement without being constrained by the parent component's layout.

### Example:
In your `Modal` component, you would typically use `ReactDOM.createPortal` to render the modal content into a specific DOM node (like a div with an ID of "modal-root") that is outside the main application structure. This ensures that the modal appears above all other content.

Here's a simplified example of how you might implement it:

```javascript
const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null; // Don't render anything if the modal is closed

  return ReactDOM.createPortal(
    <div className="modal">
      <Header title={name} onClose={onClose} />
      {children}
    </div>,
    document.getElementById("modal-root") // Targeting the modal root
  );
};
```

In this example, the modal will be rendered in the `modal-root` div, allowing it to overlay other content properly. 

 */
