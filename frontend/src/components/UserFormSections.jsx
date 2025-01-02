/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../app/resumePreviewSlice/resultPreviewSlice';

export default function UserFormSections({ fields }) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.resumePreview.userDetails);

  // Helper to get a nested value from userDetails by path, e.g. 'profile.name'
  const getValueByKey = (keyPath) => {
    return keyPath.split('.').reduce((acc, cur) => acc?.[cur], userDetails);
  };

  // Helper to set a nested value in userDetails
  const setValueByKey = (keyPath, newValue) => {
    // For simplicity, assume 2 levels max: e.g. 'profile.name'
    const keys = keyPath.split('.');
    if (keys.length === 1) {
      dispatch(
        setUserDetails((prev) => ({
          ...prev,
          [keys[0]]: newValue,
        }))
      );
    } else if (keys.length === 2) {
      const [top, sub] = keys;
      dispatch(
        setUserDetails((prev) => ({
          ...prev,
          [top]: {
            ...prev[top],
            [sub]: newValue,
          },
        }))
      );
    }
    // If you have deeper nesting, you'd need a more robust approach.
  };

  // Add a new item to an array field
  const addArrayItem = (arrayKey, defaultItem = {}) => {
    dispatch(
      setUserDetails((prev) => ({
        ...prev,
        [arrayKey]: [...(prev[arrayKey] || []), defaultItem],
      }))
    );
  };

  // Remove an item from an array field
  const removeArrayItem = (arrayKey, idx) => {
    dispatch(
      setUserDetails((prev) => ({
        ...prev,
        [arrayKey]: (prev[arrayKey] || []).filter((_, i) => i !== idx),
      }))
    );
  };

  // Update a subfield in an array
  const updateArrayItem = (arrayKey, idx, subKey, newValue) => {
    dispatch(
      setUserDetails((prev) => {
        const copy = [...prev[arrayKey]];
        copy[idx] = { ...copy[idx], [subKey]: newValue };
        return { ...prev, [arrayKey]: copy };
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => {
        // 1. If it's a normal input field
        if (
          !field.type ||
          field.type === 'text' ||
          field.type === 'textarea' ||
          field.type === 'month'
        ) {
          // "type" is 'text', 'textarea', 'month', etc.
          if (field.type === 'textarea') {
            return (
              <div key={index} className="flex flex-col gap-2">
                <label className="font-semibold">{field.label}</label>
                <textarea
                  rows={4}
                  value={getValueByKey(field.key) || ''}
                  onChange={(e) => setValueByKey(field.key, e.target.value)}
                  className="border p-2 rounded-md"
                />
              </div>
            );
          }

          // If it's 'text' or 'month'
          return (
            <div key={index} className="flex flex-col gap-2">
              <label className="font-semibold">{field.label}</label>
              <input
                type={field.type === 'month' ? 'month' : 'text'}
                value={getValueByKey(field.key) || ''}
                onChange={(e) => setValueByKey(field.key, e.target.value)}
                className="border p-2 rounded-md"
              />
            </div>
          );
        }

        // 2. If it's an array field (e.g. professionalExperience, skills)
        if (field.type === 'array') {
          const arrayData = getValueByKey(field.key) || [];
          const arrayKey = field.key; // e.g. "professionalExperience" or "skills"

          // If we're dealing with an array of objects
          if (
            field.itemFields &&
            field.itemFields.length > 0 &&
            field.itemFields[0].key !== ''
          ) {
            // Example: professionalExperience array, each item has {company, position, ...}
            return (
              <div key={index} className="flex flex-col gap-2">
                <label className="font-semibold">
                  {field.label || 'Items'}
                </label>
                {arrayData.map((item, i) => (
                  <div key={i} className="border p-4 rounded-md mb-2 relative">
                    <button
                      type="button"
                      onClick={() => removeArrayItem(arrayKey, i)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
                    >
                      Remove
                    </button>

                    {field.itemFields.map((subField, subIdx) => {
                      return (
                        <div key={subIdx} className="flex flex-col gap-1 my-2">
                          <label className="text-sm font-semibold">
                            {subField.label}
                          </label>
                          {subField.type === 'textarea' ? (
                            <textarea
                              rows={3}
                              value={item[subField.key] || ''}
                              onChange={(e) =>
                                updateArrayItem(
                                  arrayKey,
                                  i,
                                  subField.key,
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded-md"
                            />
                          ) : (
                            <input
                              type={
                                subField.type === 'month' ? 'month' : 'text'
                              }
                              value={item[subField.key] || ''}
                              onChange={(e) =>
                                updateArrayItem(
                                  arrayKey,
                                  i,
                                  subField.key,
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded-md"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    // Build a default item object
                    const defaultObj = {};
                    field.itemFields.forEach((f) => {
                      defaultObj[f.key] = '';
                    });
                    addArrayItem(arrayKey, defaultObj);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  + Add Item
                </button>
              </div>
            );
          } else {
            // Possibly an array of strings (like skills)
            return (
              <div key={index} className="flex flex-col gap-2">
                <label className="font-semibold">
                  {field.label || 'Items'}
                </label>
                {arrayData.map((val, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => {
                        const newVal = e.target.value;
                        setUserDetails((prev) => {
                          const copy = [...prev[arrayKey]];
                          copy[i] = newVal;
                          return { ...prev, [arrayKey]: copy };
                        });
                      }}
                      className="border p-2 rounded-md flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(arrayKey, i)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addArrayItem(arrayKey, '')}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  + Add Skill
                </button>
              </div>
            );
          }
        }

        return null; // Fallback if field type is unknown
      })}
    </div>
  );
}
