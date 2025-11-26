import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { apiURL } from '../../apiURL';
import Modal from '../../components/Modal/Modal.Component';
import useInputValidation from '../../utils/hooks/useInputValidation';
import TextFormTextarea from '../../components/Input/TextFormTextarea.component';
import { Dropdown } from '../../components/Dropdown/Dropdown.Component';
import { Button } from '../../components/Button/Button.component';
import './Submit.Style.css';
import { useUserContext } from '../../userContext';

export const Submit = () => {
  const { user } = useUserContext();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topics, setTopics] = useState([]);
  const [validForm, setValidForm] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);
  const [promptTitle, promptTitleError, validatePromptTitle] =
    useInputValidation('prompt');
  const [promptDescription, promptDescriptionError, validatePromptDescription] =
    useInputValidation('description');
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  useEffect(() => {
    async function fetchTopics() {
      const response = await fetch(`${apiURL()}/topics`);
      const examples = await response.json();
      setTopics(examples);
    }
    fetchTopics();
  }, []);

  const topicOptions = topics.map((topic) => topic.title);
  const addPrompt = async (prompt, description, topicId) => {
    const response = await fetch(`${apiURL()}/prompts`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: prompt,
        description,
        topic_id: topicId,
      }),
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (promptTitleError || promptTitle.length === 0) {
      setInvalidForm(true);
      setValidForm(false);
    } else {
      setInvalidForm(false);
      setValidForm(true);
      addPrompt(promptTitle, promptDescription, selectedTopic);
      setOpenConfirmationModal(true);
    }
  };

  const setDropdownTopic = (topicName) => {
    const value = topics
      .filter((topic) => topic.title === topicName.toString())
      .map((item) => item.id);
    setSelectedTopic(value[0]);
  };

  return (
    <>
      <Helmet>
        <title>Submit an app</title>
      </Helmet>
      <main>
        <h1 className="hero-header">Submit an app</h1>
        <div className="form-container add-app-container">
          <div className="form-box submit-box">
            <form>
              <TextFormTextarea
                value={promptTitle}
                placeholder="App name"
                onChange={validatePromptTitle}
                error={promptTitleError}
              />
              <TextFormTextarea
                value={promptDescription}
                placeholder="Description/Explanation"
                onChange={validatePromptDescription}
                error={promptDescriptionError}
              />
              <Dropdown
                label="topic"
                options={topicOptions}
                onSelect={(topicName) => setDropdownTopic(topicName)}
                showFilterIcon={false}
                showLabel={false}
              />
              <Button
                primary
                className="btn-add-prompt"
                onClick={handleSubmit}
                label="Suggest an app"
              />
              {validForm && (
                <Modal
                  title="Your prompt has been submitted!"
                  open={openConfirmationModal}
                  toggle={
                    (() => setOpenConfirmationModal(false),
                    () => window.location.reload(true))
                  }
                />
              )}
              {invalidForm && (
                <p className="error-message">Form is not valid</p>
              )}
            </form>
          </div>
          <p>Reach out to agorh @ icloud.com </p>
        </div>
      </main>
    </>
  );
};
