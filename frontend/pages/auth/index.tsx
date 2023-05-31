import React, { useEffect } from "react";
import Div from "ui/components/Div";
import { 
    Form,
    FormHeader,
    FormSubHeader,
    InputDiv,
    FormInput,
    SubText
} from "public/css/auth/login";
import Button from "ui/components/Button";
import { useTheme } from "styled-components";
import { emailRegex } from "lib/Constants";
import { useRouter } from "next/router";

//svg
import { ReactComponent as EmailSVG} from "../../public/svg/auth/email.svg";
import { ReactComponent as PasswordSVG} from "../../public/svg/auth/password.svg";
import Link from "next/link";
import { firebaseSignIn } from "lib/auth";

const Auth = () => {
    const router = useRouter();
    const theme = useTheme();

    // react states
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [disabled, setDisabled] = React.useState<boolean>(true);

    const [csrfToken, setCsrfToken] = React.useState<string>("");

    //get crsf token
    useEffect(() => {
        fetch(`${process.env.API_DOMAIN}/`).then(res => res.json()).
        then(data => setCsrfToken(data['csrfToken']))
    }, []);

    React.useEffect(() => {
        if(password !== "" && email.match(emailRegex)) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }, [email, password]);

    const triggerAuth = async(e) => {
        console.log(e.keyCode)
        if(e.keyCode != 13 || disabled) return;
        const info = await firebaseSignIn(email, password, csrfToken);
        if(info.success) router.push("/");
    };

    React.useEffect(() => {
        router.prefetch('/');
    }, [router]);

    return(
        <>
        <Div
            borderRadius={0}
            display="flex"
            justifyContent="center"
            alignSelf="center"
            minHeight="100vh"
            backgroundColor={theme.arrowBg}>
            <Form backgroundColor={theme.canvasBg}>
                <Div>
                    <FormHeader>Sign In</FormHeader>
                    <FormSubHeader >to continue to EveryPenny</FormSubHeader>
                </Div>
                <h6 style={{ fontSize: 16, margin: "1.5rem 0 0.75rem 0"}}>
                    Email
                </h6>
                <InputDiv>
                    <div>
                        <FormInput
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            id="user-text-field"
                            type="email"
                            autoComplete="username"
                            borderBottomColor="none"
                            color={theme.textColor}
                        />
                    </div>
                    <div>
                        <EmailSVG />
                    </div>
                </InputDiv>
                <h6 style={{ fontSize: 16, margin: "1.5rem 0 0.75rem 0"}}>
                    Password
                </h6>
                <InputDiv>
                        <div>
                            <FormInput
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                onKeyDown={event => triggerAuth(event)}
                                id="password-text-field"
                                type="password"
                                autoComplete="current-password"
                                borderBottomColor="none"
                                color={theme.textColor}
                            />
                        </div>
                        <div>
                            <PasswordSVG />
                        </div>
                </InputDiv>
                <input type="hidden" name="_csrf" value={csrfToken} />
                <Button
                    type="submit"
                    borderRadius="0.5rem"
                    width="100%"
                    textAlign="center"
                    fontSize="0.9rem"
                    color="#fff"
                    fontWeight={700}
                    marginTop="2rem"
                    padding="0.75rem"
                    onClick={triggerAuth}
                    disabled={disabled}>
                    Login
                </Button>
                <SubText color={theme.textColor}>
                    Forgot your password?{" "}
                    <Link href="/auth/forgot">
                        <span style={{ color: theme.textColor}}>Reset it.</span>
                    </Link>
                </SubText>
            </Form>
        </Div>
        </>
    )
};

export default Auth;