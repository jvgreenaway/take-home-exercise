import React from 'react'
import { compose, withProps } from 'recompose'
import { reduxForm } from 'redux-form'
import { Flex, Box, Button, Message, Text } from 'rebass'
import { Form, Field } from 'redux-form'

import { loginHandler } from 'resources/auth/routines'

const ErrorNotice = withProps({ 
  color: 'white', 
  bg: 'red',
})(Message)

const Spinner = withProps({ children: 'Loading' })(Message)

const Label = Text.withComponent('label').extend`
  display: block
`

const Login = ({ onSubmit, error, submitting }) => (
  <Form onSubmit={onSubmit}>
    <Flex align="center" justify="center">
      <Box w={.5}>
        <Box>
          <Label htmlFor="login-email" children="Email" />
          <Field id="login-email" component={'input'} type="email" name="email" /*required*/ />
        </Box>
        <Box mt="2">
          <Label htmlFor="login-password" children="Password" />
          <Field id="login-password" component={'input'} type="password" name="password" /*required*/ />
        </Box>

        {error && !submitting
          ? <ErrorNotice mt={3}>{error}</ErrorNotice>
          : null
        }

        {submitting
          ? <Spinner mt={3} />
          : <Button type="submit" mt={3}>Login</Button>
        }
      </Box>
    </Flex>
  </Form>
)

const withform = (form, onSubmit, props) => compose(
  reduxForm({
    form,
    onSubmit,
    ...props,
  }),
  withProps(({ handleSubmit, onSubmit, reset, submitting }) => ({
    onSubmit: handleSubmit(onSubmit),
    onReset: reset,
    loading: submitting,
  })),
)

export default withform('login', loginHandler)(Login)
