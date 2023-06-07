import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['AcademyOwner'];
  const roles = ['AcademyOwner', 'AcademyOwner', 'Coach', 'Player', 'Parent'];
  const applicationName = 'radical-football75';
  const tenantName = 'Academy';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Academy Owner:
1. As an Academy Owner, I want to be able to create and manage multiple teams within my academy, so I can efficiently organize my players and coaches.
2. As an Academy Owner, I want to have an overview of all player profiles, so I can track their progress and development.
3. As an Academy Owner, I want to be able to assign coaches to specific teams, so they can focus on the development of those players.
4. As an Academy Owner, I want to be able to manage and schedule training sessions, matches, and events for my academy, so everyone is informed and up-to-date.
5. As an Academy Owner, I want to be able to communicate with coaches, players, and parents through the platform, so I can easily share important information and updates.

Coach:
1. As a Coach, I want to be able to view and update individual player profiles, so I can track their progress and provide personalized feedback.
2. As a Coach, I want to be able to create and assign training plans and exercises to players, so they can work on specific skills and improve their performance.
3. As a Coach, I want to be able to communicate with players and parents through the platform, so I can share updates, feedback, and important information.
4. As a Coach, I want to be able to view and manage my team's schedule, so I can plan training sessions and matches accordingly.
5. As a Coach, I want to be able to analyze player performance data, so I can make informed decisions about their development and potential.

Player:
1. As a Player, I want to be able to view and update my individual profile, so I can track my progress and share my achievements with others.
2. As a Player, I want to be able to access my assigned training plans and exercises, so I can work on improving my skills and performance.
3. As a Player, I want to be able to communicate with my coach and teammates through the platform, so I can stay informed and connected.
4. As a Player, I want to be able to view my team's schedule, so I know when and where training sessions and matches are taking place.

Parent:
1. As a Parent, I want to be able to view my child's individual player profile, so I can track their progress and development.
2. As a Parent, I want to be able to communicate with my child's coach through the platform, so I can stay informed about their performance and any important updates.
3. As a Parent, I want to be able to view my child's team schedule, so I can plan and coordinate transportation and other logistics for training sessions and matches.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
