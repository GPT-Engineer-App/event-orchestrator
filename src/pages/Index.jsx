import { Container, VStack, Text, Button, Input, useToast, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const handleAddEvent = () => {
    if (!name || !description) {
      toast({
        title: "Error",
        description: "Name and description are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newEvent = { id: events.length + 1, name, description };
    setEvents([...events, newEvent]);
    setName("");
    setDescription("");
    toast({
      title: "Event Added",
      description: "Your event has been added successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Event Deleted",
      description: "Your event has been deleted successfully",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEdit = (id) => {
    const event = events.find(event => event.id === id);
    setName(event.name);
    setDescription(event.description);
    handleDelete(id);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" mb={4}>Event Manager</Text>
        <Input placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button colorScheme="blue" onClick={handleAddEvent}>Add Event</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map(event => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.description}</Td>
                <Td>
                  <IconButton icon={<FaEdit />} onClick={() => handleEdit(event.id)} aria-label="Edit" />
                  <IconButton icon={<FaTrash />} onClick={() => handleDelete(event.id)} aria-label="Delete" ml={2} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;