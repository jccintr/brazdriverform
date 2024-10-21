import React,{useState} from 'react'
import { Text,Box, Heading,Flex,FormControl,FormLabel,InputGroup,Input,Textarea,Button,useToast,Alert,AlertTitle,AlertDescription,AlertIcon } from '@chakra-ui/react'
import carro from './assets/carro.png';
import logo from './assets/logo2.png';
import { Image } from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

const App = () => {
  const [nome,setNome] = useState('');
  const [telefone,setTelefone] = useState('');
  const [mensagem,setMensagem] = useState('');
  const [email,setEmail] = useState('');
  const toast = useToast();
  const [isLoading,setIsLoading] = useState(false);


  const onEnviar = async () => {
    
    if (nome.trim().length===0 || telefone.trim().length===0 ){
       
     toast({
       title: 'Atenção !',
       description: "Por favor, informe o seu nome e o seu telefone.",
       status: 'error',
       duration: 3000,
       isClosable: true,
     })
        
        return
    }
 
    setIsLoading(true);
 
    const templateParams = {
       from_name: nome,
       from_email: email,
       from_phone: telefone,
        message: mensagem
    }
 
    
    const response = await emailjs.send('service_kr87iur', 'template_94rgxkg', templateParams,'9Fk204d4daU3I1Y6n')
    if (response.status===200){
          setNome('');
          setEmail('');
          setTelefone('');
          setMensagem('');
          toast({title: 'Mensagem Enviada !', description: "Recebemos a sua mensagem. Em breve entraremos em contato.",status: 'success', duration: 3000, isClosable: true,});
          setIsLoading(false);
          return;
    }

    setIsLoading(false);
    toast({
      title: 'Atenção !',
      description: "Ocorreu um problema ao tentar enviar a sua mensagem. Tente novamente mais tarde por favor.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
     
   }

  return (
    <Flex height={'100%'} flexDirection={'column'} align={'center'} bg={'#174ea6'} p={2}>
       
        <Flex w='100%' align={'center'} justify={'center'} direction={{ base: 'column', lg: 'row' }} mt='10' mb='10' gap={10}>
           <Image w={{ base: '300px', lg: '450px' }}  src={logo} alt="Logo Braz Driver" />
           <Image w={{ base: '300px', lg: '500px' }} src={carro} alt="Aplicativo Gestor" />
        </Flex>
        
        <Heading mb={10} align={'center'} fontWeight={'bold'} fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }} lineHeight={'110%'}>Seja nosso motorista parceiro!</Heading>
        <Text align={'center'} color={'white'} mb={10}>Preencha o formulário abaixo com os seus dados para que possamos entrar em contato com você.</Text>
       
       
        <Alert
          status='error'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          width={{ base: '300px', lg: '800px' }}
        >
         <AlertIcon/>
         <AlertTitle mt={2} mb={1} fontSize='lg'>
           Atenção !
         </AlertTitle>
          <AlertDescription maxWidth='3xl'>
          Você deve possuir um veículo e estar devidamente habilitado para dirigir para aplicar a uma vaga de motorista parceiro.
          </AlertDescription>
        </Alert>

        <Flex w={{base:'340px', lg:'600px'}} direction={'column'} mt={10} gap={5} mb={10} >
            <FormControl isRequired>
              <FormLabel color={'white'}>Nome</FormLabel>
                <InputGroup>
                  <Input type="text" name="nome" placeholder="Seu nome" value={nome} onChange={e => setNome(e.target.value)} />
                </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel color={'white'}>Seu Telefone</FormLabel>
                <InputGroup>
                  <Input type="text" name="telefone" placeholder="Seu telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
                </InputGroup>
            </FormControl>
            <FormControl>
                    <FormLabel color={'white'}>Email (opcional)</FormLabel>
                    <InputGroup>
                     
                      <Input type="text" name="email" placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)} />
                    </InputGroup>
                  </FormControl>
            <FormControl>
              <FormLabel color={'white'}>Outras informações (opcional)</FormLabel>
              <Textarea
                name="mensagem"
                placeholder="Sua mensagem"
                rows={6}
                resize="none"
                value={mensagem} onChange={e => setMensagem(e.target.value)}
              />
            </FormControl>
            <Button onClick={onEnviar} w="full" mt='20px' colorScheme='orange' isLoading={isLoading}>ENVIAR</Button>
        </Flex>
        <Text fontSize={'xs'} align={'center'} color={'white'} >(C) 2024 - Braz Driver Aplicativo de Mobilidade</Text>
    </Flex>
  )  
}

export default App