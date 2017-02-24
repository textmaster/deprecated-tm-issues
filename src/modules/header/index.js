import React from 'react';
import {
  Container,
  Banner,
  Block,
  Media,
  NavItem,
  Heading,
  Space,
  Text,
  Toolbar,
} from 'rebass';

export default () =>
  <div>
    <Toolbar backgroundColor="gray2">
      <NavItem href="/">TM Issues</NavItem>
      <Space auto />
      <NavItem href="https://github.com/textmaster/tm-issues">GitHub</NavItem>
    </Toolbar>
    <Banner
      mb={4}
      p={0}
      align="left"
      style={{
        fontSize: 'inherit',
        minHeight: '10vh',
        overflow: 'hidden',
      }}
      backgroundColor="midgray"
    >
      <Container style={{ width: '100%', maxWidth: 1280 }}>
        <Block px={2}>
          <Media align="center" img="/assets/tmLogo.png">
            <Heading level={2} size={0} >Issues</Heading>
            <Text>Post proper Github issues with ease</Text>
          </Media>
        </Block>
      </Container>
    </Banner>
  </div>;

