import React from "react";
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
import { createUser } from "lib/auth";
import { useRouter } from "next/router";
import Link from "next/link";

import { phoneNumberRegex } from "lib/Constants";

//svg
import { ReactComponent as EmailSVG} from "../../public/svg/auth/email.svg";
import { ReactComponent as PasswordSVG} from "../../public/svg/auth/password.svg";

const Create = () => {
    const router = useRouter();
    const theme = useTheme();

    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [name, setName] = React.useState("");

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [disabled, setDisabled] = React.useState<boolean>(true);

    const triggerAuth = async(e) => {
        if(e.keyCode === 13 || e.type === "click") {
            const info = await createUser({
                email,
                password,
                firstName: name.split(" ")[0],
                lastName: name.split(" ").slice(1).join(" "),
                phoneNumber
            });
            if(info.success) router.push("/");
        } else return;
    };

    React.useEffect(() => {
        if(phoneNumber != "" && !phoneNumber.match(phoneNumberRegex)) return;
        if(name && email && password !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        };
    }, [name, email, password, phoneNumber]);
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
                    <FormHeader>Sign Up</FormHeader>
                    <FormSubHeader >to start saving with EveryPenny</FormSubHeader>
                </Div>
                <h6 style={{ fontSize: 16, margin: "1.5rem 0 0.75rem 0"}}>
                    Name
                </h6>
                <InputDiv>
                        <div>
                            <FormInput
                                value={name}
                                onChange={event => setName(event.target.value)}
                                onKeyDown={event => triggerAuth(event)}
                                type="text"
                                borderBottomColor="none"
                                color={theme.textColor}
                            />
                        </div>
                        <div>
                            <PasswordSVG />
                        </div>
                </InputDiv>
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
                <h6 style={{ fontSize: 16, margin: "1.5rem 0 0.75rem 0"}}>
                    Phone Number
                </h6>
                <InputDiv>
                        <div>
                            <FormInput
                                value={phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})/, '$1$2$3')}
                                onChange={event => setPhoneNumber(event.target.value)}
                                onKeyDown={event => triggerAuth(event)}
                                type="text"
                                borderBottomColor="none"
                                color={theme.textColor}
                            />
                        </div>
                        <div>
                            <PasswordSVG />
                        </div>
                </InputDiv>
                {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
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
                    onClick={e => triggerAuth(e)}
                    disabled={disabled}>
                    Sign Up
                </Button>
                <SubText color={theme.textColor}>
                    Already have an account?{" "}
                    <Link href="/auth">
                        <span style={{ color: theme.textColor}}>Log in.</span>
                    </Link>
                </SubText>
            </Form>
        </Div>
        </>
    );
};

export default Create;