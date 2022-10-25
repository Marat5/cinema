import { ChangeEvent, FormEvent, useState } from 'react';
import { ButtonSet } from '../../components/ButtonSet/ButtonSet';
import { AuthCard } from '../../components/AuthCard/AuthCard';
import { CustomButton } from '../../components/CustomButton/CustomButton';
import { CustomTextInput } from '../../components/CustomTextInput/CustomTextInput';
import './LoginPage.css';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="LoginPage">
      <AuthCard title="Login" handleSubmit={handleSubmit}>
        <CustomTextInput title="Username" value={username} onChange={handleUsernameChange} placeholder="Guest" />
        <CustomTextInput title="Password" value={password} onChange={handlePasswordChange} placeholder="123" />

        <ButtonSet>
          <CustomButton text="Login" type="submit" bottomGap={8} showLoadIndicator={isLoading} />
          <CustomButton text="Register new account" type="button" look="secondary" />
        </ButtonSet>
      </AuthCard>
    </div>
  );
}
